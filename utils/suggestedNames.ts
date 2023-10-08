export const suggestedNamesTransformer = ({
  suggestedFormula,
  portNumber
}: {
  suggestedFormula: string
  portNumber?: number
}) => {
  let suggestName = ''
  switch (true) {
    case suggestedFormula.includes('{number}'):
      suggestName = suggestedFormula.replace(
        '{number}',
        portNumber?.toString() || '1'
      )
      break

    case suggestedFormula.includes('{string}'):
      break
  }
  return suggestName

  // necesito separar el valor de la formula: eth-{number}
}
