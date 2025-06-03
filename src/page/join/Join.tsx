import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import Logo from "../../component/logo/Header";
import useScreenWidth from "../../hooks/useScreenWidth";
import s from './Join.module.css';
import { useCallback, useState } from "react";
import api from "../../common/axios";
type FieldKey = '아이디' | '이메일' | '닉네임' | '비밀번호';

type FieldValue = {
    value: string;
    validation: boolean;
};
interface InputFieldProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    isValid: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ name, value, onChange, placeholder, isValid }) => {
    return (
        <input
            className={s.input}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={name === "비밀번호" ? "password" : "text"}
            style={{ borderColor: isValid ? '#505050' : '#e73e3e' }}
        />
    );
};

const Join = () => {
    const fieldConfigs: { key: FieldKey; placeholder: string }[] = [
        { key: '아이디', placeholder: '아이디 (영문 8자 이상)' },
        { key: '이메일', placeholder: '이메일 (영문)' },
        { key: '닉네임', placeholder: '닉네임 (2자 이상)' },
        { key: '비밀번호', placeholder: '비밀번호 (영문, 숫자 조합 8자 이상)' },
    ];
    const nav = useNavigate();
    const screenWidth = useScreenWidth();
    const [val, setVal] = useState<Record<FieldKey, FieldValue>>({
        아이디: { value: '', validation: false },
        이메일: { value: '', validation: false },
        닉네임: { value: '', validation: false },
        비밀번호: { value: '', validation: false },
    });
    const [msg, setMsg] = useState('가입하기');
    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const key = name as FieldKey;
        let isValid = false;
        const noKorean = key === '닉네임' ? value : value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
        switch (key) {
            case '아이디':
                isValid = value.length >= 8;
                break;
            case '닉네임':
                isValid = value.length >= 2;
                break;
            case '비밀번호':
                isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(noKorean);
                break;
            case '이메일':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(noKorean);
                break;
            default:
                isValid = false;
        }
        setVal(p => ({ ...p, [key]: { ...p[key], value: noKorean, validation: isValid } }));
    }, []);
    const handleSubmit = async () => {
        const isAllValid = Object.values(val).every(field => field.validation);
        isAllValid ? nav('') : setMsg('빨간 박스를 모두 없애주세요!');
        const f = new FormData();
        f.append('id', val['아이디'].value);
        f.append('email', val['이메일'].value);
        f.append('nickname', val['닉네임'].value);
        f.append('password', val['비밀번호'].value);
        if (isAllValid) {
            const res = await api.post('/join',f);
            if (res.status === 200) {
                nav('/login');
            } else {
                setMsg('가입 실패! 다시 시도해주세요.');
            }
        }
    }
    return (
        <>
            <Logo />
            <motion.div
                initial={{ x: -screenWidth, scale: 0 }}
                animate={{ opacity: 1, x: 0, scale: 1}}
                exit={{ x: -screenWidth, scale: 0}}
                transition={{
                    duration: 0.65,
                    ease: 'easeOut'
                }}>
                <div className={s.container}>
                    <div className={s.wrapper}>
                    <div className={s.title}>회원 가입</div>
                    {fieldConfigs.map(({ key, placeholder }) => (
                        <InputField
                            key={key}
                            name={key}
                            value={val[key].value}
                            onChange={handleOnChange}
                            placeholder={placeholder}
                            isValid={val[key].validation}
                        />
                    ))}
                    <div className={s.signupCheckerContainer}>
                        <div>
                        <input type="checkbox" />
                        <span>만 14세 이상입니다.</span>
                        </div>
                        <div>
                        <input type="checkbox" />
                        <span>(필수) 팝콘메이트 서비스 이용 약관</span>
                        <span onClick={()=>nav('/legal')} className={s.legalButton}>보기</span>
                        </div>
                    </div>
                    <button className={s.submit} onClick={handleSubmit}>{msg}</button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Join;