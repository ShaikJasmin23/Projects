import random
import time

def intro():
    print("🎮 Welcome to the Number Guessing Game!")
    name = input("Enter your name: ").strip()
    if not name:
        name = "Player"
    print(f"\nHi {name}! I’m thinking of a number between 1 and 100.")
    print("You have 6 chances to guess it. Let’s go!\n")
    return name

def play_game(name):
    number = random.randint(1, 100)
    max_guesses = 6
    guesses = 0

    while guesses < max_guesses:
        try:
            guess = int(input(f"Attempt {guesses + 1}: Enter your guess: "))
            if guess < 1 or guess > 100:
                print("⛔ Please guess a number between 1 and 100.")
                continue

            guesses += 1

            if guess < number:
                print("📉 Too low!")
            elif guess > number:
                print("📈 Too high!")
            else:
                print(f"\n🎉 Congratulations {name}! You guessed it in {guesses} attempts.")
                break

            if guesses < max_guesses:
                print("🔁 Try again.\n")

        except ValueError:
            print("❗ That's not a valid number. Try again.")

    else:
        print(f"\n😢 Sorry, {name}. The correct number was {number}.")

def main():
    while True:
        name = intro()
        play_game(name)
        again = input("\n🔁 Do you want to play again? (yes/no): ").lower()
        if again not in ['yes', 'y']:
            print("\n👋 Thanks for playing! Goodbye!")
            break

if __name__ == "__main__":
    main()
