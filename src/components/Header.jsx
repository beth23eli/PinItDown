import React, {useState} from "react";
import PushPinIcon from '@mui/icons-material/PushPin';
import SearchIcon from '@mui/icons-material/Search';

function Header(props) {
    const [isExpanded, setExpanded] = useState(false);
    function expandSearchBar(value) {
        setExpanded(value);
    }

    return (
        <header>
            <h1>
                <PushPinIcon/>
                PinItDown
            </h1>
            <div>
                {isExpanded && (<input name="search"
                                       placeholder="Search a note..."
                                       onMouseOut={() => expandSearchBar(false)}
                                       onChange={(e) => props.onSearch(e.target.value)}/>)}
                <SearchIcon className={"search-icon"} onMouseOver={() => expandSearchBar(true)}/>
            </div>

        </header>
    );
}

export default Header;
