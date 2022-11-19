const bmiClass = (bmi : number) : string => {
  if (bmi < 18.5)
    return "Underweight";
  else if (bmi < 25)
    return "Normal";
  else if (bmi < 30)
    return "American";
  else if (bmi < 35)
    return "Overweight";
  else if (bmi < 40)
    return "Big Body";
  else if (bmi < 45)
    return "Bulk szn gone raw";
  else if (bmi > 50)
    return "tuff || khaliMuscle";
}

const calculateBmi = (height: number, weight: number) : string => {
  let bmi : number = weight / ((height / 100) ** 2);

  return `${bmiClass(bmi)} (${bmi.toFixed(1)} bmi)`;
}

let height : number = Number(process.argv[2]);
let weight : number = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
