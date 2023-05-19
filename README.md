# custom_replace_babel_plugin
This is a plugin for clear or replace content by string or regex by custom.

#### features
- clear useless character
  - blank character（ASCII 32）
  - tab character（ASCII 9）
  - CRLF/LF（ASCII 10）
  - CR（ASCII 13）
- compress js
- replace content by string or regex

#### how to use custom_replace_babel_plugin?
*options*
| name | type | default | description |
| `removeCharacter` | boolean or undefined | true | default to remove all useless character |
| `removeCharacterType` | 'blank'、'tab'、'CRLF'、'LF'、'CR' | | default to remove all useless character and can not set `removeCharacter` to false, otherwise throw error |
| `compressJs` | boolean or undefined | true | default to compress js |
| `replaceContentRegex` | Regex or undefined | | default not replace content, otherwise replace content by regex |