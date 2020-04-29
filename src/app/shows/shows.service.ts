import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Show {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  isFavorite: boolean;
}

let shows = [
  {
    id: 1,
    name: 'Breaking Bad',
    imgUrl: 'https://i1.wp.com/metro.co.uk/wp-content/uploads/2018/11/breaking-bad-main-new-9926.jpg',
    description: `Mild-mannered high school chemistry teacher Walter White thinks his life can't get much worse.
    His salary barely makes ends meet, a situation not likely to improve once his pregnant wife gives birth,
    and their teenage son is battling cerebral palsy.
    But Walter is dumbstruck when he learns he has terminal cancer.
    Realizing that his illness probably will ruin his family financially,
    Walter makes a desperate bid to earn as much money as he can in the time
    he has left by turning an old RV into a meth lab on wheels.`,
    isFavorite: false
  },
  {
    id: 2,
    name: 'Person of Interest',
    imgUrl: 'https://assets.nydailynews.com/polopoly_fs/1.954520.1318384863!/img/httpImage/image.jpg_gen/derivatives/article_750/alg-person-interest-jpg.jpg',
    description: `Former CIA agent Reese (Jim Caviezel) -- now presumed dead -- and billionaire software genius Finch (Michael Emerson) join forces as a vigilante crime-fighting team. Using Finch's program, which employs pattern recognition to determine individuals who will soon be involved in violent crimes, they combine Reese's covert-operations training and Finch's money and cyberskills to stop crimes before they happen. Former Army Intelligence Support Activity operative Sameen Shaw joins the pair in their quest.`,
    isFavorite: false
  },
  {
    id: 3,
    name: 'Suits',
    imgUrl: 'https://www.usanetwork.com/sites/usanetwork/files/styles/full_episodes_633x356/public/suits_cast_mike.jpg',
    description: `Mike Ross, a talented young college dropout, is hired as an associate by Harvey Specter, one of New York's best lawyers. They must handle cases while keeping Mike's qualifications a secret.`,
    isFavorite: false
  },
  {
    id: 4,
    name: 'Prison Break',
    imgUrl: 'https://d.newsweek.com/en/full/460571/prison-break-miniseries.jpg',
    description: 'An engineer installs himself in a prison he helped design, in order to save his falsely accused brother from a death sentence.',
    isFavorite: false
  }
];

@Injectable({ providedIn: 'root' })
export class ShowsService {
  getAll(): Observable<Array<Show>> {
    return of(shows);
  }

  favoriteShow(id) {
    shows = shows.map(show => show.id === id ? {...show, isFavorite: true} : show);
    return of(null);
  }

  unfavoriteShow(id) {
    shows = shows.map(show => show.id === id ? {...show, isFavorite: false} : show);
    return of(null);
  }

  removeShow(id) {
    shows = shows.filter(show => show.id !== id);
    return of(null);
  }
}
