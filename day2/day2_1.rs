use std::env;
use std::fs::File;
use std::io::{self, BufRead, BufReader};

// struct holding number of red, green and blue balls
#[derive(Debug)]
struct Cubes {
    red: u32,
    green: u32,
    blue: u32,
}

// parse Cubes from a string like '3 blue, 4 red'
impl std::str::FromStr for Cubes {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut cubes = Cubes {
            red: 0,
            green: 0,
            blue: 0,
        };
        for cube in s.split(", ") {
            if let Some((count, color)) = cube.split_once(' ') {
                let count = count
                    .parse::<u32>()
                    .map_err(|e| format!("Could not parse count: {}", e))?;
                match color {
                    "red" => cubes.red = count,
                    "green" => cubes.green = count,
                    "blue" => cubes.blue = count,
                    _ => return Err(format!("Unknown color: {}", color)),
                }
            } else {
                return Err(format!("Could not parse cube: {}", cube));
            }
        }
        Ok(cubes)
    }
}

const MAX_CUBES: Cubes = Cubes {
    red: 12,
    green: 13,
    blue: 14,
};

impl Cubes {
    fn is_valid(&self) -> bool {
        self.red <= MAX_CUBES.red && self.green <= MAX_CUBES.green && self.blue <= MAX_CUBES.blue
    }
}

fn parse_line(line: &str) -> Option<u32> {
    // split line into game number and cubes
    if let Some((game, cubes)) = line.split_once(": ") {
        // Game is 'Game <number>'
        let game = game.split_once(' ')?.1.parse::<u32>().ok()?;
        // Each cube is '<number> <color>'
        let cubes = cubes.split("; ");
        for cube in cubes {
            let cube = cube.parse::<Cubes>().ok()?;
            if !cube.is_valid() {
                return None;
            }
        }
        return Some(game);
    } else {
        return None;
    }
}

fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();
    //  read input file
    let input_file = args.get(1).expect("Please provide an input file");

    let file = File::open(input_file)?;
    let reader = BufReader::new(file);
    let mut sum_ids = 0;
    for line in reader.lines() {
        let line = line?;
        // split line into game number and cubes
        println!("{}", line);
        if let Some(game) = parse_line(&line) {
            println!("{}", game);
            sum_ids += game;
        }
    }
    println!("Sum of valid game ids: {}", sum_ids);
    Ok(())
}
