import { v4 as uuid } from 'uuid'

import { supabaseBrowser } from '../lib/supabase-browser'

export const uploadImage = async (file: File) => {
  const ext = file.name.split('.').pop()
  const fileName = `${uuid()}.${ext}`
  const filePath = `exercise_images/${fileName}`

  const { error } = await supabaseBrowser.storage
    .from('gym-tracking-app')
    .upload(filePath, file, { upsert: false })

  if (error) throw error

  const { data } = await supabaseBrowser.storage
    .from('gym-tracking-app')
    .getPublicUrl(filePath)

  return data.publicUrl as string
}
