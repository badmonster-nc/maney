import template from './card.html!text';

export default (ngModule) =>
    ngModule.component('card',
        {
            template: template,
            controller: Card,
            bindings: {
                user: '<'
            }
        });

/*@ngInject*/
class Card {
    constructor() {
        console.log('CardComponent 2');
    }
}
