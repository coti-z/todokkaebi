import { ObjectType, OmitType } from '@nestjs/graphql';
import { CategoryType } from '@project/presentation/resolver/type/category.type';

@ObjectType()
export class CreateCategoryOutput extends OmitType(CategoryType, ['tasks']) {}
