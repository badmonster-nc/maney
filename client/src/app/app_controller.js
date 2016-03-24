import Rx from 'rx';

export default (ngModule) =>
    ngModule.controller('AppController', AppController);

/*@ngInject*/
class AppController {

    constructor($timeout, $templateCache, AppConfig) {
        console.log('AppController', AppConfig);
        console.log('$templateCache', $templateCache);

        this.$timeout = $timeout;

        this.cards = [
            {name: 'One', thumb: 'assets/1.jpg'},
            {name: 'Two', thumb: 'assets/2.jpg'},
            {name: 'Three', thumb: 'assets/3.jpg'},
            {name: 'Four', thumb: 'assets/4.jpg'},
            {name: 'Five', thumb: 'assets/5.jpg'}
        ];

        this.plus$ = new Rx.Subject();
        this.minus$ = new Rx.Subject();

        this.currentIdx$ = Rx.Observable
            .merge(this.plus$, this.minus$)
            .throttle(500)
            .startWith(0)
            .scan((acc, n) => {
                acc = acc + n > this.cards.length - 1 ? -1 :
                    acc + n < 0 ? this.cards.length : acc;
                return acc + n;
            });


        this.currentIdx$
            .subscribe(value => {
                this.$timeout(() => {
                    this.showName = false;
                    this.currentUser = this.cards[value];
                }, 0);
            });
    }

    onBack() {
        this.minus$.onNext(-1)
    }

    onNext() {
        this.plus$.onNext(1)
    }

    onSelect() {
        this.showName = true;
    }


    test() {
        return true;
    }
}
