// import MonacoEditor from '@uiw/react-monacoeditor';
import useThemeToggler from '../../hooks/useThemeToggle/Index';
import MonacoEditor from '@monaco-editor/react';
import { useCallback, useEffect, useState } from 'react';
import Loader from '../Loader/Index';
import useDebounce from '../../hooks/useDebounce/Index';

type EditorPropsType = {
    jsonData: any;
    readOnly: boolean;
    height?: number | string;
    width?: number | string;
    setData?: (value: any) => void;
};

export default function Editor({ jsonData, readOnly, height, setData, width }: EditorPropsType) {
    let [value, setValue] = useState<string>(JSON.stringify(jsonData));
    const debouncedValue = useDebounce<any>(value, 500);

    const handleEditorChange = (value: any) => {
        setValue(value);
        setData && setData(value);
    };

    useEffect(() => {}, [debouncedValue]);

    return (
        <>
            <MonacoEditor
                language="json"
                value={JSON.stringify(jsonData, null, '\t')}
                options={{
                    autoIndent: 'brackets',
                    copyWithSyntaxHighlighting: true,
                    fontLigatures: true,
                    fontSize: 14,
                    wordWrap: 'on',
                    wrappingIndent: 'deepIndent',
                    wrappingStrategy: 'advanced',
                    foldingStrategy: 'indentation',
                    matchBrackets: 'always',
                    fontWeight: '300',
                    readOnly,
                    detectIndentation: true,
                    minimap: {
                        enabled: false,
                    },
                }}
                theme={localStorage.getItem('theme') === 'dark' ? 'vs-dark' : 'vs'}
                loading={<Loader />}
                height={height}
                width={width}
                className="w-full h-full border border-gray-200 dark:border-gray-900"
                defaultLanguage="json"
                onChange={handleEditorChange}
            />
        </>
    );
}
