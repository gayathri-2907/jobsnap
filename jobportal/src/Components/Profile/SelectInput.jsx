import { useEffect, useState, useRef } from 'react';
import { Combobox, InputBase, ScrollArea, useCombobox } from '@mantine/core';
import { IconBriefcase } from '@tabler/icons-react';

export function SelectInput(props) {
    const { form, name, options, label, placeholder } = props;

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [data, setData] = useState(options || []);  
    const [value, setValue] = useState(form.getInputProps(name).value || "");  
    const [search, setSearch] = useState(value);  
    const prevValue = useRef(value); 

    const exactOptionMatch = data.some((item) => item === search);
    const filteredOptions = exactOptionMatch
        ? data
        : data.filter((item) => item.toLowerCase().includes(search?.toLowerCase().trim()));

    const optionsList = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    useEffect(() => {
        // Update the form state only if the value is different from the previous value
        if (prevValue.current !== value) {
            form.setFieldValue(name, value);
            prevValue.current = value;  // Update previous value
        }
        //eslint-disable-next-line
    }, []);

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                if (val === '$create') {
                    setData((current) => [...current, search]);
                    setValue(search);
                    form.setFieldValue(name, search);  
                } else {
                    setValue(val);
                    setSearch(val);
                    form.setFieldValue(name, val);  
                }

                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    {...form.getInputProps(name)}  
                    withAsterisk
                    className='w-50 fw-medium'
                    label={label}
                    leftSection={<IconBriefcase stroke={1.5} />}
                    value={search || ""}
                    onChange={(event) => {
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);  // Update local search state
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || '');  // Reset search on blur if value is empty
                    }}
                    placeholder={placeholder}
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize mah={150} type="scroll">
                        {optionsList}
                        {!exactOptionMatch && search?.trim()?.length > 0 && (
                            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
                        )}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
