import { AngularEditorConfig } from '@kolkov/angular-editor';
export var global_info = {
  url: 'http://localhost:4000/',
  editorOpt: {
    editable: true,
    sanitize: true,
    placeholder: 'Enter text here...',
    toolbarHiddenButtons: [
      [
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'toggleEditorMode'
      ]
    ]
  },
  langList : [
    "php",
    "typescript",
    "html",
    "javascript",
    "python",
    "c",
    "c++",
    "css",
    "c#",
    "java",
    "another"
  ]
}
