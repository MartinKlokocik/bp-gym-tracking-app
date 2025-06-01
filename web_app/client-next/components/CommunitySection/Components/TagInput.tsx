import { Input } from '@heroui/react'
import { X } from 'lucide-react'
import { KeyboardEvent, useState } from 'react'

export default function TagInput({
  tags,
  onTagsChange,
  error,
}: {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  error?: string
}) {
  const [currentTag, setCurrentTag] = useState('')

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag])
    }
    setCurrentTag('')
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(currentTag)
    } else if (e.key === 'Backspace' && !currentTag && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <div
            key={tag}
            className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded-full text-sm md:text-md"
          >
            <span>#{tag}</span>
            <X
              className="w-3 h-3 cursor-pointer hover:text-red-300"
              onClick={() => removeTag(tag)}
            />
          </div>
        ))}
      </div>
      <Input
        value={currentTag}
        onChange={e => setCurrentTag(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags (press Enter or comma to add)"
        variant="bordered"
        radius="full"
        errorMessage={error}
        className="text-sm"
      />
    </div>
  )
}
