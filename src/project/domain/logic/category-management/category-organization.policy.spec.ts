import { CategoryOrganizationPolicy } from './category-organization.policy';
import { Project } from '@project/domain/entity/project.entity';
import { DomainException } from '@libs/exception';
import { Category } from '@project/domain/entity/category.entity';

describe('CategoryOrganizationPolicy', () => {
  let category: Category;
  let project: Project;
  const projectName = 'projectName';
  const categoryname = 'categoryName';
  const requestUserId: string = 'user-1234-1234-1234-1234';

  beforeEach(() => {
    project = Project.create({
      adminId: requestUserId,
      name: projectName,
    });
    category = Category.create({
      name: categoryname,
      projectId: project.id,
    });

    project.addCategory(category);
  });
  describe('canDeleteCategory', () => {
    it('should throw DomainException when project is null', () => {
      expect(() => CategoryOrganizationPolicy.canDeleteCategory(null as any, 'user-123')).toThrow(
        DomainException,
      );
    });

    it('should throw DomainException when userId is null', () => {
      const project = {} as Project;

      expect(() => CategoryOrganizationPolicy.canDeleteCategory(project, null as any)).toThrow(
        DomainException,
      );
    });

    it('should pass when valid project and userId provided', () => {
      expect(() =>
        CategoryOrganizationPolicy.canDeleteCategory(project, requestUserId),
      ).not.toThrow();
    });
  });

  describe('canCreateCategory', () => {
    it('should throw DomainException when project is null', () => {
      project = null as any;
      expect(() => CategoryOrganizationPolicy.canDeleteCategory(project, requestUserId)).toThrow(
        DomainException,
      );
    });

    it('should throw DomainException when userId is null', () => {
      const reqNullUserId = null as any;
      expect(() => CategoryOrganizationPolicy.canDeleteCategory(project, reqNullUserId)).toThrow(
        DomainException,
      );
    });
    it('should pass when valid project and userId provided', () => {
      expect(() =>
        CategoryOrganizationPolicy.canDeleteCategory(project, requestUserId),
      ).not.toThrow();
    });
  });

  describe('canChangeCategoryName', () => {
    it('should throw DomainException when project is null', () => {
      expect(() =>
        CategoryOrganizationPolicy.canChangeCategoryName(null as any, 'user-123'),
      ).toThrow(DomainException);
    });

    it('should throw DomainException when userId is null', () => {
      const reqNullUserId = null as any;

      expect(() =>
        CategoryOrganizationPolicy.canChangeCategoryName(project, reqNullUserId),
      ).toThrow(DomainException);
    });

    it('should pass when valid project and userId provided', () => {
      expect(() =>
        CategoryOrganizationPolicy.canChangeCategoryName(project, requestUserId),
      ).not.toThrow();
    });
  });
});
