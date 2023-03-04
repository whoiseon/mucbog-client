import { css, Global } from '@emotion/react';
import { themedPalette } from '@/styles/palette';

export const EditorStyle = css`
  .toastui-editor-defaultUI {
    border-top: none;
    border-bottom: none;
    border-right: none;
    border-left: none;

    .toastui-editor-md-tab-container {
      background-color: ${themedPalette.bg_page};
      border-bottom: none;

      .tab-item {
        border: 1px solid ${themedPalette.border4};
        background-color: ${themedPalette.bg_page};
        margin-top: 8px;
        font-size: 14px;
      }

      .tab-item.active {
        background-color: ${themedPalette.bg_element1};
        color: ${themedPalette.text1};
      }
    }
  }

  .toastui-editor-defaultUI-toolbar {
    border-radius: 0;
    border-bottom: none;
    height: 56px;
    padding-left: 16px;
    padding-right: 16px;
    background-color: ${themedPalette.bg_page};

    button {
      border: none;
      color: ${themedPalette.text3};
      font-size: 16px;
      &:hover {
        background-color: ${themedPalette.bg_element3};
        border: none;
      }
    }

    .toastui-editor-toolbar-group {
      display: flex;
      align-items: center;
    }

    .toastui-editor-toolbar-icons.bullet-list {
      background-position-x: -152px;
    }

    .toastui-editor-toolbar-icons.more {
      background-position-x: -410.6px;
    }

    .toastui-editor-dropdown-toolbar {
      background-color: ${themedPalette.bg_element2};
      border: none;
      border-radius: 4px;
      flex-wrap: wrap;
      height: auto;
    }
  }

  .toastui-editor-popup {
    background: ${themedPalette.bg_element2};
    color: ${themedPalette.text2};
    border: none;
  }

  .toastui-editor-main-container {
    color: ${themedPalette.text1};

    .ProseMirror {
      color: ${themedPalette.text1};
      font-size: 16px;
      padding: 16px 24px;
      height: calc(100% - 80px);

      .toastui-editor-md-code {
        background-color: ${themedPalette.bg_element2};
      }
    }

    .toastui-editor-md-splitter {
      display: none;
    }

    .toastui-editor-md-code-block-line-background {
      background-color: ${themedPalette.bg_element3};
    }
  }

  .toastui-editor-md-container {
    .toastui-editor-md-preview {
      padding: 0 24px;
      height: calc(100% - 80px);
    }
  }

  .toastui-editor-contents {
    font-size: 16px;

    p {
      color: ${themedPalette.text1};
    }
    pre {
      background-color: ${themedPalette.bg_element3};
      border-radius: 6px;
      padding: 16px;
      margin: 8px 0 16px;
    }
    code {
      background-color: ${themedPalette.bg_element3};
      border-radius: 2px;
      color: ${themedPalette.text2};
      padding: 3px 6px;
    }
    blockquote {
      background: ${themedPalette.bg_element3};
      padding: 16px;
      border-left: 4px solid ${themedPalette.primary2};
    }
    hr {
      border: 0.5px solid ${themedPalette.border4};
    }
    ul {
      & > li::before {
        margin-top: 11px;
      }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      border-bottom: none;
      color: ${themedPalette.text1};
    }

    .toastui-editor-md-preview-highlight::after {
      content: '';
      background-color: transparent;
      border-radius: 4px;
      z-index: -1;
      position: absolute;
      top: -4px;
      right: -4px;
      left: -4px;
      bottom: -4px;
    }
  }
`;
