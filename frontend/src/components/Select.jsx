import ReactSelect from 'react-select';

export default function Select({ options = [], components, isError, ...rest }) {
  const yellow500 = '#eab308';
  const red500 = '#ef4444';

  const gray900 = 'black'; // bg
  const gray800 = '#1f2937'; // menu / option
  const gray700 = '#374151'; // borders
	const gray300 = '#d1d5db'; // placeholder
	const slate400 = '#94a3b8';

  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      marginTop: '0.25rem',
      padding: '0.25rem 1rem', // py-2 px-4
      backgroundColor: 'transparent',
      borderRadius: '999px',
      borderWidth: '1px',
      borderColor: isError
        ? red500
        : state.isFocused
        ? yellow500
        : slate400,
      boxShadow: state.isFocused
        ? `0 0 0 1px ${yellow500}`
        : 'none',
      '&:hover': {
        borderColor: isError ? red500 : yellow500,
      },
    }),

    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: 'white',
      fontWeight: '500',
    }),

    input: (baseStyles) => ({
      ...baseStyles,
      color: 'white',
    }),

    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: gray300,
    }),

    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: gray800,
			// borderRadius: '0.75rem',
      boxShadow:
        '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
    }),

    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected
        ? gray700
        : state.isFocused
        ? '#272f3d'
        : gray800,
      color: state.isSelected ? yellow500 : 'white',
      fontWeight: state.isSelected ? '600' : 'normal',

      ':active': {
        backgroundColor: yellow500,
        color: gray900,
      },
    }),
  };

  return (
    <ReactSelect
      options={options}
      components={components}
      styles={customStyles}
      {...rest}
    />
  );
}
