class Card {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    createCard() {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${this.title}</h3><p>${this.content}</p>`;
        card.addEventListener('click', () => this.handleClick(card));
        document.body.appendChild(card);
    }

    handleClick(card) {
        card.style.backgroundColor = '#f0f0f0';
        alert(`Kattintottál: ${this.title}`);
    }
}

class SpecialCard extends Card {
    constructor(title, content, specialEffect) {
        super(title, content);
        this.specialEffect = specialEffect;
    }

    handleClick(card) {
        super.handleClick(card);
        card.style.transform = this.specialEffect;
    }
}

// Kártyák létrehozása
const card1 = new Card('Első Kártya', 'Ez egy egyszerű kártya.');
const card2 = new SpecialCard('Speciális Kártya', 'Ez egy különleges kártya!', 'rotate(10deg)');

card1.createCard();
card2.createCard();

// Stílus hozzáadása
const style = document.createElement('style');
style.innerHTML = `
    .card { padding: 20px; margin: 10px; border: 1px solid #ddd; width: 200px; cursor: pointer; }
    .card:hover { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); }
`;
document.head.appendChild(style);
