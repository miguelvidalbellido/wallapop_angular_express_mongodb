import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import commentDeletePrisma from "../../utils/db/comment/commentDeletePrisma";
import commentViewer from "../../view/commentViewer";


export default async function deleteComment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
  
    try {
  
      // Remove comment from database
      const comment = await commentDeletePrisma(id);
      if (!comment) return res.sendStatus(500);
  
      // Create comment view
      const commentView = commentViewer(comment);
      return res.json({ comment: commentView });
    } catch (error) {
      return next(error);
    }
  }