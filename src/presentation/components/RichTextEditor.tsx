import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import './RichTextEditor.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || 'Write something...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[160px] p-4',
      },
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
  });

  return (
    <div className="border border-stone-300 rounded-lg bg-amber-50/30">
      {/* <div className="border-b border-stone-200 p-2 flex gap-2 flex-wrap">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${
            editor?.isActive('bold') ? 'bg-amber-200' : 'bg-white'
          } border border-stone-300 hover:bg-amber-100`}
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${
            editor?.isActive('italic') ? 'bg-amber-200' : 'bg-white'
          } border border-stone-300 hover:bg-amber-100`}
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded ${
            editor?.isActive('bulletList') ? 'bg-amber-200' : 'bg-white'
          } border border-stone-300 hover:bg-amber-100`}
        >
          • List
        </button>
      </div> */}
      
      <EditorContent editor={editor} />
    </div>
  );
};