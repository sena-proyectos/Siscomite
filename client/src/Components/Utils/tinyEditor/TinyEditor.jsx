import React, { useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'

export const TinyEditor = ({ template, onContentChange, minH, maxH, width }) => {
  const editorRef = useRef(null)

  const handleEditorChange = (content) => {
    if (onContentChange) {
      onContentChange(content) // Actualiza el contenido en el estado local
    }
  }

  useEffect(() => {
    if (editorRef.current && template !== editorRef.current.getContent()) {
      editorRef.current.setContent(template)
    }
  }, [template])

  return (
    <Editor
      apiKey="j3h0y9fdd49fkze53ln9ljta3y61l8euttv8yxic4478p04u"
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={template} // Usa el contenido HTML dinámico aquí
      onEditorChange={handleEditorChange}
      init={{
        min_height: minH,
        max_height: maxH,
        width: width || 500,
        plugins: ['fullscreen', 'image', 'link', 'lists', 'preview', 'table', 'code'],
        content_style: template
      }}
    />
  )
}
