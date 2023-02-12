class Person {
    constructor(name) {
        this.name = name
    }
    greet = () => {
        return `Hey ${this.name}, Welcome to JS!`
    }
}

const person = new Person('Reetu')
console.log(person.greet())

class Developer extends Person {
    constructor(name, skills) {
        super(name)
        this.skills = skills
    }
    getSkills = () => {
        return this.skills
    }
    addSkill = (skill) => {
        if(typeof skill === 'string') {
            this.skills.push(skill)
        }
        console.error('Invalid skill')
    }
}

const developer = new Developer('Tushar', ['ReactJS', 'Spring Boot', 'AWS'])
console.log(developer.greet())