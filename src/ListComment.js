import React from 'react';
import axios from 'axios';
const { useState, useEffect } = React;
import { Card, Rate } from 'antd';



// Reference: https://codesandbox.io/s/heuristic-roentgen-mu0ot?file=/src/GroupForm.js
const CommentList  = ( props) => {
    const [comments, setComments] = useState();

    useEffect(()=>{
        console.log("Xx ",props.recipeId)
        axios.get(`/api/comment/${props.recipeId}`)
        .then(result=>{              
            console.log(result.data.data);
            setComments(result.data.data);
        })
        .catch(error=>console.log(error));
       
     },[props.commentSubmitResult]);

    return (<div className="comment-list">
        {comments==undefined? "": comments.map(comment =>
            <Card size="small" title={comment.name} 
                extra={<Rate disabled defaultValue={comment.rating} />}>
                <p>{comment.comment}</p>
             </Card>
        )}
      
    </div>
    )
  };


export default CommentList;
