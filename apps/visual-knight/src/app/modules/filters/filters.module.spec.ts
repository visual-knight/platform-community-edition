import { FiltersModule } from './filters.module';

describe('FiltersModule', () => {
  let filtersModule: FiltersModule;

  beforeEach(() => {
    filtersModule = new FiltersModule();
  });

  it('should create an instance', () => {
    expect(filtersModule).toBeTruthy();
  });
});
