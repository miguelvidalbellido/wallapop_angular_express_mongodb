import { comments } from "@prisma/client";

export default function commentViewer(
    _comment: comments 
) {
    const commentView = {
        id: _comment.id,
        body: _comment.body,
        commentOwner: _comment.commentOwner,
        productId: _comment.productId
    };
    return commentView;
}