import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import PropTypes from 'prop-types'

/**
 * Render a block of code with syntax highlighting via prism
 *
 * This component gives us full control over how these are rendered
 *
 * Syntax highlighing out of the box in MDX is tough/impossible to configure
 * so they recommend ripping this jawn
 */
export const Code = ({ code, language, lang, js, html, bash, json }) => (
  <Highlight
    {...defaultProps}
    code={code}
    language={
      language || lang || js
        ? 'js'
        : html
        ? 'html'
        : bash
        ? 'bash'
        : json
        ? 'json'
        : 'text'
    }
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre
        className={className}
        style={{ ...style, marginTop: 0, marginBottom: '1.45rem' }}
      >
        <code>
          {tokens.map((line, i) => (
            <div
              key={i}
              {...getLineProps({ line, key: i })}
              style={{ lineHeight: '1.45rem' }}
            >
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} style={{}} />
              ))}
            </div>
          ))}
        </code>
      </pre>
    )}
  </Highlight>
)

Code.defaultProps = {
  language: null,
  lang: null,
  js: false,
  html: false,
  bash: false,
  json: false,
}

Code.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  lang: PropTypes.string,
  js: PropTypes.bool,
  html: PropTypes.bool,
  bash: PropTypes.bool,
  json: PropTypes.bool,
}
