import React, {useRef,useState,useEffect} from 'react';
import classes from '../../sass/FileInput.module.sass';
import { CameraIcon } from '../../assets/index';

const FileInput = ({ label, onChange, name, initialFileName }) => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState(initialFileName);

    useEffect(() => {
        setFileName(initialFileName);
    }, [initialFileName]);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        }
        onChange(e); 
    };

    return (
        <div className={classes.input_box}>
            <label className={classes.input_label}>{label}:</label>
            <div className={classes.file_input_wrapper}>
                <div className={classes.camera_wrapper}>
                    <img src={CameraIcon} alt="camera icon" className={classes.camera_icon} />
                </div>
                <div className={classes.upload_text}>
                    {   fileName    ?   <p className={classes.text +" "+classes.file}>{fileName}</p>
                                    :   <>
                                            <p className={classes.text}>Upload File</p>
                                            <p className={classes.sub_text}>Size 600x150px, JPG SVG PNG, Max 200kb</p>
                                        </>    
                    }
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    name={name} 
                    className={classes.file_input} 
                    accept="image/*"
                />
                <button type={"button"} className={classes.file_button} onClick={handleButtonClick}>Choose File</button>
            </div>
        </div>
    );
}

export default FileInput;
