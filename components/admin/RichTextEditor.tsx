'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold, Italic, Strikethrough, List, ListOrdered,
  Heading2, Heading3, Quote, Undo, Redo
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[300px] px-4 py-3 text-brand-brown-dark',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  const tools = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), label: 'Gras' },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), label: 'Italique' },
    { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike'), label: 'Barré' },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }), label: 'Titre 2' },
    { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }), label: 'Titre 3' },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList'), label: 'Liste' },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList'), label: 'Liste numérotée' },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote'), label: 'Citation' },
    { icon: Undo, action: () => editor.chain().focus().undo().run(), active: false, label: 'Annuler' },
    { icon: Redo, action: () => editor.chain().focus().redo().run(), active: false, label: 'Rétablir' },
  ]

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-0.5 p-2 border-b border-gray-200 bg-gray-50">
        {tools.map(({ icon: Icon, action, active, label }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            title={label}
            className={cn(
              'p-2 rounded hover:bg-gray-200 transition-colors',
              active && 'bg-brand-gold/20 text-brand-brown'
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      <EditorContent editor={editor} />
      {!value && placeholder && !editor.isFocused && (
        <p className="absolute px-4 py-3 text-gray-400 pointer-events-none">{placeholder}</p>
      )}
    </div>
  )
}
