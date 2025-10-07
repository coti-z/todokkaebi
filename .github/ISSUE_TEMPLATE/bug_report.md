---
name: 🐛 Bug Report
about: Report a bug
title: '[BUG] '
labels: bug
assignees: ''
type: task
body:
  - type: textarea
    attributes:
      label: 'Steps to reproduce'
      description: |
        How the issue manifests?
        You could leave this blank if you already write this in your reproduction code
      placeholder: |
        1. `npm ci`
        2. `npm start:dev`
        3. See error...
  - type: textarea
    attributes:
      label: 'Expected vs Actual'
      description: |
        can you wite your expected result
      placeholder: |
        1. `npm ci`
        2. `npm start:dev`
        3. write your expected result
  - type: input
    attributes:
      label: 'Node.js version'
      description: 'Which version of Node.js are you using?'
      placeholder: '24.0.0'
  - type: checkboxes
    validations:
      required: true
    attributes:
      label: 'In which operating systems have you tested?'
      options:
        - label: macOS
        - label: Windows
        - label: Linux
---
