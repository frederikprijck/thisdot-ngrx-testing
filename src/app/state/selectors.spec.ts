import * as fromSelectors from './selectors';
import { Show } from '../shows/shows.service';

describe('Selectors', () => {
  it('should select the favorite shows', () => {
    const initialState: Array<Show> = [
      {
        id: 1,
        name: 'Test',
        description: 'Description',
        imgUrl: '',
        isFavorite: true
      },
      {
        id: 2,
        name: 'Test',
        description: 'Description',
        imgUrl: '',
        isFavorite: false
      }
    ];
    const result = fromSelectors.selectFavoriteShows.projector(initialState);
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(1);
  });
});
