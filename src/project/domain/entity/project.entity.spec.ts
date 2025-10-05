import { CreateProjectProps, Project } from '@project/domain/entity/project.entity';
describe('project entity', () => {
  describe('constructor', () => {
    const projectData: CreateProjectProps = {
      adminId: '1234-1234-1234-1234',
      name: 'project-test',
    };

    const project = Project.create(projectData);

    expect(project.adminId).toBe(projectData.adminId);
    expect(project.name).toBe(projectData.name);
  });

  describe('method', () => {
    let project: Project;
    beforeEach(() => {
      const projectData: CreateProjectProps = {
        adminId: '1234-1234-1234-1234',
        name: 'project-test',
      };
      project = Project.create(projectData);
    });

    it('should change name', () => {
      const changedName = 'changed name';
      project.changeName(changedName);

      expect(project.name).toBe(changedName);
    });

    it('should change adminId', () => {
      const changedAdminId = '4321-4321-4321-4321';

      project.changeAdminId(changedAdminId);
      expect(project.adminId).toBe(changedAdminId);
    });
  });
});
