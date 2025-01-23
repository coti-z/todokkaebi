import { ObjectType, OmitType, PickType } from '@nestjs/graphql';
import { CategoryType } from '@project/presentation/resolver/type/category.type';

@ObjectType()
export class CreateCategoryOutput extends OmitType(CategoryType, ['tasks']) {}

@ObjectType()
export class DeleteCategoryOutput extends PickType(CategoryType, ['id']) {}

@ObjectType()
export class UpdateCategoryOutput extends CategoryType {}
