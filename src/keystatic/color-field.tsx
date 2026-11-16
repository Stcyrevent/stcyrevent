import type { BasicFormField } from '@keystatic/core';

const HEX = /^#[0-9a-f]{6}$/i;

/** A hex color field with a color picker, stored as "#rrggbb". */
export function color({
  label,
  description,
  defaultValue = '#000000',
}: {
  label: string;
  description?: string;
  defaultValue?: string;
}): BasicFormField<string> {
  const parse = (value: unknown) => {
    if (value === undefined) return defaultValue;
    if (typeof value !== 'string') throw new Error(`${label} must be a color`);
    return value;
  };
  const validate = (value: string) => {
    if (!HEX.test(value)) throw new Error(`${label} must look like #a1b2c3`);
    return value.toLowerCase();
  };

  return {
    kind: 'form',
    label,
    Input({ value, onChange, autoFocus, forceValidation }) {
      const invalid = forceValidation && !HEX.test(value);
      return (
        <div style={{ display: 'grid', gap: 6 }}>
          <label style={{ fontWeight: 600, fontSize: 14 }}>{label}</label>
          {description && <span style={{ fontSize: 13, opacity: 0.7 }}>{description}</span>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              type="color"
              aria-label={`${label} picker`}
              value={HEX.test(value) ? value : '#000000'}
              onChange={(e) => onChange(e.target.value)}
              style={{ width: 48, height: 36, padding: 0, border: '1px solid #ccc', borderRadius: 6, cursor: 'pointer' }}
            />
            <input
              type="text"
              aria-label={`${label} hex code`}
              autoFocus={autoFocus}
              value={value}
              onChange={(e) => onChange(e.target.value.trim())}
              style={{ width: 110, height: 36, padding: '0 10px', fontFamily: 'monospace', border: `1px solid ${invalid ? '#d33' : '#ccc'}`, borderRadius: 6 }}
            />
          </div>
          {invalid && <span style={{ color: '#d33', fontSize: 13 }}>Use a hex code like #a1b2c3</span>}
        </div>
      );
    },
    defaultValue: () => defaultValue,
    parse,
    serialize: (value) => ({ value }),
    validate,
    reader: { parse: (value) => validate(parse(value)) },
  };
}
