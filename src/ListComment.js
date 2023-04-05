// This component lists comments of a recipe (used in Recipe Detail page)
import React from 'react';
import axios from 'axios';
const { useState, useEffect } = React;
import { Card, Rate } from 'antd';

const CommentList  = ( props) => {
    const [comments, setComments] = useState();

    useEffect(()=>{

        axios.get(`/api/v1/comment/${props.recipeId}`)
        .then(result=>{              
            console.log(result.data.data);
            setComments(result.data.data);
        })
        .catch(error=>console.log(error));
       
     },[props.commentSubmitResult]);

    return (<div className="comment-list">
        {comments==undefined? "": comments.map(comment =>
            <Card size="small" title={comment.name}  key={comment._id}
                extra={<Rate disabled defaultValue={comment.rating} />}>
                <p>{comment.comment}</p>
             </Card>
        )}
      
    </div>
    )
  };


export default CommentList;
