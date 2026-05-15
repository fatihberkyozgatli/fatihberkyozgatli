import { useState, KeyboardEvent } from 'react'
import { X } from 'lucide-react'

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
}

export default function TagInput({ tags, onTagsChange, placeholder = 'Type an exclusion' }: TagInputProps) {
  const [input, setInput] = useState('')

  const addTag = () => {
    const trimmed = input.trim()
    if (trimmed && !tags.includes(trimmed)) {
      onTagsChange([...tags, trimmed])
    }
    setInput('')
  }

  const removeTag = (tag: string) => {
    onTagsChange(tags.filter((t) => t !== tag))
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      onTagsChange(tags.slice(0, -1))
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-foreground">Exclusions</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        onBlur={addTag}
        placeholder={placeholder}
        className="
          w-full px-3 py-2.5 rounded-md
          bg-input text-foreground
          border border-transparent
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
          placeholder:text-muted-foreground
          text-sm leading-relaxed transition-colors
        "
      />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border"
            >
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label={`Remove ${tag}`}
              >
                <X className="w-3 h-3" />
              </button>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
