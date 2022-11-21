/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class New extends Document {
  @Prop()
  created_at: string;

  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop()
  author: string;

  @Prop({ type: Number })
  points: number;

  @Prop()
  story_text: string;

  @Prop()
  comment_text: string;

  @Prop({ type: Number })
  num_comments: number;

  @Prop({ type: Number })
  story_id: number;

  @Prop()
  story_title: string;

  @Prop()
  story_url: string;

  @Prop({ type: Number })
  parent_id: number;

  @Prop({ type: Number })
  created_at_i: number;

  @Prop({ type: [String] })
  _tags: Types.Array<string>;

  @Prop()
  objectID: string;

  @Prop({ default: false })
  deleted: boolean;
}

export const NewSchema = SchemaFactory.createForClass(New);

