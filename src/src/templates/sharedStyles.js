import { BORDER, LIGHT_GRAY } from '../constants/colors'

export default `
  hr {
    background: ${BORDER};
    height: 3px;
  }

  pre {
    max-width: 100%;
    background: ${LIGHT_GRAY} !important;
    margin: 0;
    margin-bottom: 1.45rem;

    .token.operator {
      background: ${LIGHT_GRAY} !important;
    }

    ::before {
      content: '' !important;
      display: none;
    }

    ::after {
      content: '' !important;
      display: none;
    }

    code {
      padding: 0 !important;
    }
  }

  code {
    background: ${LIGHT_GRAY} !important;
    line-height: 1.45rem;
    padding: 0.1em 0.3em !important;

    ::before {
      content: '' !important;
      display: none;
    }

    ::after {
      content: '' !important;
      display: none;
    }
  }

  tbody tr {
    :hover {
      background: ${LIGHT_GRAY};
    }
  }
`
