import { useTranslation } from "react-i18next";
import { useState } from "react";
import { MdLanguage } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import languages from "./languages";
import { motion } from "framer-motion";

const LanguageSelector = ({ style }: {
    style?: React.CSSProperties
}) => {
    const [language, setLanguage] = useState("English(English)");
    const [languageList, setLanguageList] = useState(languages);
    const [dropDownClicked, setDropDownClicked] = useState(false);
    const { i18n } = useTranslation();
    interface Language {
        name: string;
        code: string;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toLowerCase();
        setLanguage(input);

        const newList = languages
            .filter((lang: Language) => lang.name.toLowerCase().includes(input))
            .sort((a: Language, b: Language) => {
                const aStartsWith = a.name.toLowerCase().startsWith(input);
                const bStartsWith = b.name.toLowerCase().startsWith(input);
                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;
                return a.name.localeCompare(b.name);
            });

        console.log(newList);
        setLanguageList(newList);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (languageList.length === 0) {
            setLanguage("English");
            i18n.changeLanguage('en');
            setLanguageList(languages);
            return;
        }
        else {
            setLanguage(languageList[0].name);
            i18n.changeLanguage(languageList[0].code);
            setLanguageList(languages);
        }
    }
    return (
        <form style={style} className="flex items-center  space-x-2 text-gray-700 pl-4 pr-4 relative ml-auto md:ml-0" onSubmit={handleSubmit}>
            <MdLanguage className="text-xl md:text-2xl font-light mr-[-5px]" />
            <div className="border-b-2 xs:border-gray-600 focus-within:bg-gray-200 focus-within:border-gray-700 flex">
                <input value={language} onChange={handleChange} className="hidden xs:block border-none focus:bg-gray-200 bg-transparent focus:font-semibold rounded-md  p-1 pl-2 pr-2 outline-none w-[100px] lg:w-[200px] font-sans" onFocus={(e) => { e.target.select() }} />
                <RiArrowDropDownLine className={`text-2xl md:text-3xl transition-all ${dropDownClicked ? 'rotate-180' : ''} hover:bg-gray-300`} onClick={() => setDropDownClicked((prev) => !prev)} />
                {
                    dropDownClicked &&
                    <motion.div className={`absolute top-full bg-white shadow-2xl w-fit left-0 z-20
                    max-h-[300px] rounded-lg overflow-auto p-2
                `}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {
                            languageList.map((lang, index) => (
                                <div key={index} className={`p-2 xs:px-6 rounded-md hover:bg-gray-300 cursor-pointer`} onClick={() => {
                                    i18n.changeLanguage(lang.code);
                                    setLanguage(lang.name);
                                    setDropDownClicked(false);
                                }}>
                                    <span className=" whitespace-nowrap text-xs xs:text-sm md:text-md">{lang.name}</span>
                                </div>
                            ))
                        }
                    </motion.div>
                }
            </div>
        </form>
    );
};

export default LanguageSelector;