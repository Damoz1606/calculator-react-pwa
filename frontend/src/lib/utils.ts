export class Calculator {

    is_operator(sign: string) {
        return (
            sign[0] === '+' ||
            sign[0] === '-' ||
            sign[0] === '*' ||
            sign[0] === '/' ||
            sign[0] === '^'
        )
    }

    private precedence(sign: string) {
        if (sign[0] === '+' || sign[0] === '-') {
            return 1;
        } else if (sign[0] === '*' || sign[0] === '/') {
            return 2;
        } else if (sign[0] === '^') {
            return 3;
        } else if (sign === 'sin' || sign === 'cos' || sign === 'tan' ||
            sign === 'csc' || sign === 'sec' || sign === 'ctg') {
            return 4;
        }
        return -1;
    }

    private format_expression(str: string) {
        let aux_str: string = "";
        str = `(${str})`;
        for (const character of str) {
            if (this.is_operator(character) || character === '(' || character === ')') {
                aux_str = `${aux_str} ${character} `
            } else {
                aux_str = `${aux_str}${character}`
            }
        }
        return aux_str;
    }

    is_number(str: string) {
        return /^\d+$/.test(str);
    }

    is_letter(str: string) {
        return /^[a-zA-Z]{1}$/.test(str)
    }

    postfix(expression: string) {
        const subs: string[] = this.format_expression(expression).split(' ');
        let postfix: string = "";
        const stack: string[] = [];
        subs.forEach((element: string) => {
            if (this.is_number(element) || this.is_letter(element)) {
                postfix += `${element} `;
            } else if (element[0] === '(') {
                stack.push(element);
            } else if (element[0] === ')') {
                while (stack.length > 0 && stack[stack.length - 1] === '(') {
                    postfix = `${postfix}${stack.pop()} `
                }
                if (stack.length > 0 && stack[stack.length - 1] !== '(') {
                    return "";
                } else {
                    try {
                        stack.pop();
                    } catch (error: any) {
                        return "";
                    }
                }
            } else {
                while (stack.length > 0 && this.precedence(element) <= this.precedence(stack[stack.length - 1])) {
                    postfix = `${postfix}${stack.pop()} `
                }
                stack.push(element);
            }
        })
        while (stack.length > 0) {
            postfix = `${postfix}${stack.pop()} `
        }
        return postfix;
    }

    private operate_basic(operator: string, a: number, b: number) {
        switch (operator) {
            case '+':
                return b + a;
            case '-':
                return b - a;
            case '*':
                return b * a;
            case '/':
                return b / a;
            case '^':
                return Math.pow(b, a);
            default:
                return 0;
        }
    }

    private operate_trigonometric(operator: string, a: number) {
        if (operator === "sin") {
            return (Math.sin(a));
        } else if (operator === "cos") {
            return (Math.cos(a));
        } else if (operator === "tan") {
            return (Math.tan(a));
        } else if (operator === "csc") {
            return (1 / Math.cos(a));
        } else if (operator === "sec") {
            return (1 / Math.sin(a));
        } else if (operator === "ctg") {
            return (1 / Math.tan(a));
        } else {
            return 0;
        }
    }

    solve_postfix(expression: string) {
        const subs: string[] = this.format_expression(expression).split(' ');
        const stack: string[] = [];
        subs.forEach((element: string) => {
            if (element !== " " && element) {
                if (this.is_number(element)) {
                    stack.push(element);
                } else if (this.is_letter(element)) {
                    stack.push(element);
                } else {
                    if (this.is_operator(element)) {
                        const data = parseFloat(stack.pop() as string);
                        if (stack.length === 0) {
                            stack.push(this.operate_basic(element, data, 0).toString());
                        } else {
                            stack.push(this.operate_basic(element, data, parseFloat(stack.pop() as string)).toString());
                        }
                    } else if (element === 'sin' || element === 'cos' || element === 'tan' ||
                        element === 'csc' || element === 'sec' || element === 'ctg') {
                        stack.push(this.operate_trigonometric(element, parseFloat(stack.pop() as string)).toString());
                    }
                }
            }
        })
        return parseFloat(stack.pop() as string);
    }

    solve_postfix_variable(expression: string, variable: string, value: number) {
        const subs: string[] = this.format_expression(expression).split(' ');
        const stack: string[] = [];
        subs.forEach((element: string) => {
            if (element !== " " && element) {
                if (this.is_number(element)) {
                    stack.push(element);
                } else if (element === variable) {
                    stack.push(value.toString());
                } else {
                    if (this.is_operator(element)) {
                        const data = parseFloat(stack.pop() as string);
                        if (stack.length === 0) {
                            stack.push(this.operate_basic(element, data, 0).toString());
                        } else {
                            stack.push(this.operate_basic(element, data, parseFloat(stack.pop() as string)).toString());
                        }
                    } else if (element === 'sin' || element === 'cos' || element === 'tan' ||
                        element === 'csc' || element === 'sec' || element === 'ctg') {
                        stack.push(this.operate_trigonometric(element, parseFloat(stack.pop() as string)).toString());
                    }
                }
            }
        })
        return parseFloat(stack.pop() as string);
    }

    is_operator_trigonometric(sign: string) {
        return (
            sign === 'sin' ||
            sign === 'cos' ||
            sign === 'tan' ||
            sign === 'csc' ||
            sign === 'sec' ||
            sign === 'ctg'
        )
    }

    is_letter_and_number (str: string) {
        return /^[a-zA-Z0-9]+$/.test(str);
    }

    check_expression(str: string) {
        const subs: string[] = this.format_expression(str).split(' ').slice(1, -1);
        if (this.is_operator(subs[0]) || this.is_operator(subs[subs.length-1]) || this.is_operator_trigonometric(subs[subs.length-1])) {
            return false;
        }
        let parenthesis_start: number = 0;
        let parenthesis_end: number = 0;
        for(const element of subs) {
            if (element === '(') {
                parenthesis_start++;
            } else if (element === ')') {
                parenthesis_end++;
            } else if (!this.is_number(element) && !this.is_letter(element) && !this.is_operator(element)) {
                return false;
            }
        }
        if (parenthesis_start !== parenthesis_end) {
            return false;
        }
        return true;
    }

    get_variable(str: string) {
        const subs = this.format_expression(str).split(' ');
        for(const item of subs){
            if (this.is_letter(item)) {
                return item;
            }
        }
        return null;
    }

}