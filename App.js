import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native';

export default class App extends Component {

    constructor()
    {
        super()
        this.state = {
            inputText : '',
            outputText : ''
        }
    }

    calculateResult()
    {
        let operation = ['C','*','/','+','-']
        const text = this.state.inputText;
        if(text == '' || operation.indexOf(text.split('').pop()) > 0)   return
        this.setState({
            inputText : eval(text).toString(),
            outputText : eval(text).toString()
        })
    }

    performOperation(o)
    {
        let operation = ['C','*','/','+','-']
        switch (o) {
            case 'C':
                const text = this.state.inputText.split('')
                text.pop()
                this.setState({
                    inputText: text.join('')
                })
                break;
            case '*':
            case '-':
            case '+':
            case '/':
                if(this.state.inputText == '' || operation.indexOf(this.state.inputText.trim().split('').pop()) > 0 )  return
                this.setState({
                    inputText : this.state.inputText+o

                })

                break;

        }
    }

    onButtonPressed(text)
    {
        if(text == '=')
        {
            return this.calculateResult()
        }

        this.setState({
            inputText: this.state.inputText+text,
            // outputText : eval(this.state.inputText+text)
        })
    }

    render() {
        let elem = []
        let operator = []
        let num = [[1, 2, 3],[4, 5, 6],[7, 8, 9],['.',0,'=']]
        let operation = ['C','*','/','+','-']
        for(let i=0; i<=3; i++)
        {
            let row = []
            for(let j=0; j<=2; j++)
            {
                row.push(<TouchableOpacity onPress={() => this.onButtonPressed(num[i][j])} style={styles.btns}><Text style={styles.btnText}>{num[i][j]}</Text></TouchableOpacity>)
            }
            elem.push(<View style={styles.numberRow}>{row}</View>)
        }

        for(let i=0; i<=4; i++)
        {
            if(operation[i] == 'C')
                operator.push(<TouchableOpacity onLongPress={() => this.setState({inputText: ''})} onPress={() => this.performOperation(operation[i])} style={styles.btns}><Text style={styles.btnText}>{operation[i]}</Text></TouchableOpacity>)
            else
                operator.push(<TouchableOpacity onPress={() => this.performOperation(operation[i])} style={styles.btns}><Text style={styles.btnText}>{operation[i]}</Text></TouchableOpacity>)
        }


        return (
          <View style={styles.container}>
            <View style={styles.input}>
                <Text style={styles.inputText}>{this.state.outputText}</Text>
            </View>
            <View style={styles.output}>
                <Text style={styles.outputText}>{this.state.inputText}</Text>
            </View>
            <View style={styles.buttons}>
                <View style={styles.number}>
                    {elem}
                </View>
                <View style={styles.operation}>
                    {operator}
                </View>
            </View>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
      flex: 2,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'flex-end'
  },
  output: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'flex-end'
  },
  inputText: {
    color: 'black',
    fontSize: 50,

  },
  btnText: {
    fontSize: 25,
    color: '#ffffff'
  },
  outputText:{
    fontSize: 25,
    color: 'black'
  },
  numberRow:{
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center'
  },
  operationRow: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center'
  },
  btns: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttons: {
      flex: 7,
      flexDirection: 'row'
  },
  number: {
      flex: 3,
      backgroundColor: '#3c3c3c',
      alignItems: 'center',
      justifyContent: 'space-around'
  },
  operation: {
      flex: 1,
      backgroundColor: '#606060',
      alignItems: 'center',
      justifyContent: 'space-around'
  },
});
