import { useState, useEffect, useCallback } from 'react';
import { ReliveMemoryView } from './presentation/views/ReliveMemoryView';
import { CreateMemoryView } from './presentation/views/CreateMemoryView';
import { HomeView } from './presentation/views/HomeView';
import { Memory, CreateMemoryDTO } from './domain/entities/Memory';
import { InMemoryMemoryRepository } from './infrastructure/repositories/InMemoryMemoryRepositoy';
import { CreateMemoryUseCase } from './application/usecases/CreateMemoryUseCase';
import { GetRandomMemoryUseCase } from './application/usecases/GetRandomMemoryUseCase';
import { GetMemoryBySentimentUseCase } from './application/usecases/GetMemoryBySentimentUseCase';
import { AddCommentUseCase } from './application/usecases/AddCommentUseCase';
import { SENTIMENTS } from './domain/entities/Sentiment';


type View = 'home' | 'create' | 'relive';

export default function MemoryBoxApp() {
  const [repository] = useState(() => new InMemoryMemoryRepository());
  const [createMemoryUseCase] = useState(() => new CreateMemoryUseCase(repository));
  const [getRandomMemoryUseCase] = useState(() => new GetRandomMemoryUseCase(repository));
  const [getMemoryBySentimentUseCase] = useState(() => new GetMemoryBySentimentUseCase(repository));
  const [addCommentUseCase] = useState(() => new AddCommentUseCase(repository));

  const [view, setView] = useState<View>('home');
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [newMemory, setNewMemory] = useState<CreateMemoryDTO>({
    text: '',
    sentiment: '',
    image: null
  });
  const [newComment, setNewComment] = useState('');

  const loadMemories = useCallback(async () => {
    const allMemories = await repository.getAll();
    setMemories(allMemories);
  }, [repository]);

  useEffect(() => {
    loadMemories();
  }, [loadMemories]);

  const handleCreateMemory = async () => {
    try {
      await createMemoryUseCase.execute(newMemory);
      setNewMemory({ text: '', sentiment: '', image: null });
      await loadMemories();
      setView('home');
    } catch (error) {
      console.error('Failed to create memory:', error);
    }
  };

  const handleRandomMemory = async () => {
    const memory = await getRandomMemoryUseCase.execute();
    if (memory) {
      setSelectedMemory(memory);
      setView('relive');
    }
  };

  const handleReliveBy = async (sentiment: string) => {
    const memory = await getMemoryBySentimentUseCase.execute(sentiment);
    if (memory) {
      setSelectedMemory(memory);
      setView('relive');
    }
  };

  const handleAddComment = async () => {
    if (!selectedMemory) return;

    try {
      const updatedMemory = await addCommentUseCase.execute(selectedMemory.id, newComment);
      setSelectedMemory(updatedMemory);
      await loadMemories();
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  if (view === 'create') {
    return (
      <CreateMemoryView
        text={newMemory.text}
        sentiment={newMemory.sentiment}
        sentiments={SENTIMENTS}
        onTextChange={(text) => setNewMemory({ ...newMemory, text })}
        onSentimentChange={(sentiment) => setNewMemory({ ...newMemory, sentiment })}
        onSave={handleCreateMemory}
        onCancel={() => setView('home')}
      />
    );
  }

  if (view === 'relive' && selectedMemory) {
    return (
      <ReliveMemoryView
        memory={selectedMemory}
        newComment={newComment}
        onCommentChange={setNewComment}
        onAddComment={handleAddComment}
        onClose={() => {
          setView('home');
          setSelectedMemory(null);
        }}
      />
    );
  }

  return (
    <HomeView
      memories={memories}
      sentiments={SENTIMENTS}
      onCreateNew={() => setView('create')}
      onRandomMemory={handleRandomMemory}
      onReliveBy={handleReliveBy}
      onSelectMemory={(memory) => {
        setSelectedMemory(memory);
        setView('relive');
      }}
    />
  );
}