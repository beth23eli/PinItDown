import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';


export default function NoteEditBar(props) {
    return (
        <div className='edit-choices'>
            <FormatBoldIcon onClick={props.onClickBold}/>
            <FormatItalicIcon onClick={props.onClickItalic}/>
            <FormatUnderlinedIcon onClick={onClickUnderlined}/>
        </div>
    )
}