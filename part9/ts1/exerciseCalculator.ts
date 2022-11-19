/*
function calculate Express
 - calculates the average time of daily exercise hours and compares it
 - to the target amount of daily hours and returns an object that includes

 returns an object
  - days : number
  - training days : number
  - original target value 
  - calculated average time
  - completed: boolean
  - rating: 1-3
  - rating desc : string

daily exercise hours are given to the function as an array that contains
the number of exercise hours for each day in the training period

*/

interface stats {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const getRating = (daily: number, target: number) : number => {
  if (daily >= target) 
    return 3;
  else if ((target - daily) < target * 0.33)
    return 2;
  else 
    return 1;
};

const getDesc = (rating : number) : string => {
  if (rating === 3)
    return "valid";
  else if (rating === 2)
    return "keep trying bud";
  else 
    return "bum";
}

const calculator = (dailyHours : Array<number>, target: number) => {
  let periodLength = dailyHours.length;
  let trainingDays = dailyHours.filter(dayHours => dayHours).length;
  let totalHours = dailyHours.reduce((total : number, hours : number) => total + hours);
  let average = totalHours / periodLength;
  let success = average >= target;

  let rating = getRating(average, target);
  let ratingDescription = getDesc(rating);

  return {periodLength, trainingDays, 
          success, rating, ratingDescription, 
          target, average};
}

let target : number = Number(process.argv[2])
let daily : Array<number> = process.argv.slice(3).map(num => +num);

console.log(calculator(daily, target));
process.env