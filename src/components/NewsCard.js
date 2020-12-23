import React, {useState} from 'react';
import '../styles/NewsCard.css';
import {BsTriangleFill} from 'react-icons/bs';

const color = {
    backgroundColor: 'rgb(59, 59, 59)', 
    overflow: 'auto',
    margin: '2px 3px',
    borderRadius: '5px'
}

const NewsCard = ({content}) => {
    const [toggle, setToggle] = useState(false);
    if(content.url) {
        let count=0;
        var start=8, end;
        for(var i=0;i<content.url.length;i++) {

            if(content.url[i] == '/') count++;

            if(count==3) {
                end = i;
                break;
            }
        }
    }
    return <React.Fragment>
        <div style={color}>
            <div className='space'>
                <li style={{marginLeft: '25px'}}>
                    <div className='left'>
                       {
                            !toggle &&
                            <BsTriangleFill className='vote' onClick={() => setToggle(toggleState => !toggleState)}/>
                       }
                    </div>
                    <div className='right'>
                        <a href={content.url} target='_blank' style={{textDecoration: 'none'}}>
                            <div className='title'>
                                {content && content.title}
                                <a href={content.url && "https://"+content.url.substring(start, end)} target='_blank'>
                                    <span className='content'>({content.url && content.url.substring(start, end)})</span>
                                </a>
                                
                            </div>
                        </a>
                        <div className='content' style={{marginBottom: '16px'}}>
                            <span>{content.score} points by {content.by}</span>
                            { 
                                toggle && <span style={{cursor: 'pointer'}} onClick={() => setToggle(toggleState => !toggleState)}> | Unvote</span>
                            }
                            <span> | {content.kids && content.kids.length} Comments</span>
                        </div>
                    </div>
                </li>
            </div>
        </div>
    </React.Fragment>
}

export default React.memo(NewsCard);