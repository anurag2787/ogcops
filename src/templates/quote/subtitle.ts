import type { TemplateDefinition } from '../types';
import { autoFontSize, commonFields, isLightColor, mixColors, truncate } from '../utils';

const template: TemplateDefinition = {
  id: 'quote-subtitle',
  name: 'Subtitle',
  category: 'quote',
  description: 'Film-still letterbox frame with a subtitle quote, speaker, and source',
  tags: ['quote', 'subtitle', 'film', 'cinema', 'video', 'talk'],
  fields: [
    {
      key: 'quote',
      label: 'Quote',
      type: 'textarea',
      defaultValue: 'Ship the small version first, then listen.',
      placeholder: 'Enter your quote...',
      required: true,
      group: 'Content',
    },
    commonFields.author,
    {
      key: 'source',
      label: 'Source',
      type: 'text',
      defaultValue: 'Opening keynote, 2026',
      placeholder: 'Opening keynote, 2026',
      group: 'Content',
    },
    commonFields.bgColor,
    commonFields.accentColor,
    commonFields.textColor,
  ],
  defaults: {
    quote: 'Ship the small version first, then listen.',
    author: 'Ana Ruiz',
    source: 'Opening keynote, 2026',
    bgColor: '#0a0a0a',
    accentColor: '#E07A5F',
    textColor: '#FFFFFF',
  },
  render: (params) => {
    const rawQuote = String(params.quote || 'Ship the small version first, then listen.').trim() || 'Ship the small version first, then listen.';
    const quoteSize = autoFontSize(rawQuote, [
      { maxLen: 50, size: 48 },
      { maxLen: 90, size: 40 },
      { maxLen: 140, size: 34 },
      { maxLen: 200, size: 28 },
    ]);
    const quote = truncate(rawQuote, 200);
    const author = truncate(String(params.author || '').trim(), 60);
    const source = truncate(String(params.source || '').trim(), 80);
    const bgColor = String(params.bgColor || '#0a0a0a');
    const accentColor = String(params.accentColor || '#E07A5F');
    const textColor = String(params.textColor || '#FFFFFF');

    const lightBg = isLightColor(bgColor);
    const accentInk = lightBg ? mixColors(accentColor, '#000000', 0.45) : accentColor;
    const quoteColor = lightBg && isLightColor(textColor) ? '#000000' : textColor;
    const quoteShadow = lightBg
      ? (isLightColor(quoteColor) ? '0 2px 4px rgba(0, 0, 0, 0.8)' : '0 1px 2px rgba(0, 0, 0, 0.15)')
      : '0 2px 8px rgba(0, 0, 0, 0.85)';

    return {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '1200px',
          height: '630px',
          backgroundColor: bgColor,
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        },
        children: [
          // Top letterbox bar
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                width: '1200px',
                height: '52px',
                backgroundColor: '#000000',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 40px',
                flexShrink: 0,
                borderBottom: lightBg ? '1px solid rgba(0, 0, 0, 0.15)' : '1px solid rgba(255, 255, 255, 0.08)',
              },
              children: source
                ? [
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: '15px',
                          fontWeight: 500,
                          color: 'rgba(255, 255, 255, 0.7)',
                          letterSpacing: '0.04em',
                        },
                        children: source,
                      },
                    },
                  ]
                : [],
            },
          },
          // Middle film still / subtitle area
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flex: 1,
                width: '1200px',
                padding: '40px 100px 48px 100px',
                background: lightBg
                  ? 'transparent'
                  : 'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.45) 100%)',
              },
              children: [
                // Speaker
                ...(author
                  ? [
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '22px',
                            fontWeight: 600,
                            color: accentInk,
                            marginBottom: '16px',
                            letterSpacing: '0.02em',
                            textAlign: 'center',
                            textShadow: lightBg ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.7)',
                          },
                          children: author,
                        },
                      },
                    ]
                  : []),
                // Quote subtitle
                {
                  type: 'p',
                  props: {
                    style: {
                      fontSize: `${quoteSize}px`,
                      fontWeight: 600,
                      color: quoteColor,
                      textAlign: 'center',
                      lineHeight: 1.35,
                      margin: 0,
                      maxWidth: '1000px',
                      textShadow: quoteShadow,
                    },
                    children: quote,
                  },
                },
              ],
            },
          },
          // Bottom letterbox bar
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                width: '1200px',
                height: '52px',
                backgroundColor: '#000000',
                flexShrink: 0,
                borderTop: lightBg ? '1px solid rgba(0, 0, 0, 0.15)' : '1px solid rgba(255, 255, 255, 0.08)',
              },
              children: [],
            },
          },
        ],
      },
    };
  },
};

export default template;
