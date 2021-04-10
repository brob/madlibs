import defaultResolve from 'part:@sanity/base/document-actions'

import {PromoteProjectOnTwitter} from './PromoteProjectOnTwitter'

export default function resolveDocumentActions(props) {
  if (props.type !== "project") {
    // Show default actions on documents not of type project
    return defaultResolve(props)
  }
  // If the document is of the type “project”, return the extra action
  return [...defaultResolve(props), PromoteProjectOnTwitter]
}