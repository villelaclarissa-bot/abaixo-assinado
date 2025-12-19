import { useState } from 'react'
import SignatureForm from './SignatureForm'
import SignatureList from './SignatureList'
import './Petition.css'

function Petition() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleSignatureAdded = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="petition">
      <header className="petition-header">
        <h1>Abaixo-Assinado</h1>
        <p>Adicione sua assinatura para apoiar nossa causa</p>
      </header>

      <main className="petition-main">
        <section className="petition-form-section">
          <SignatureForm onSignatureAdded={handleSignatureAdded} />
        </section>

        <section className="petition-list-section">
          <h2>Assinaturas</h2>
          <SignatureList refreshTrigger={refreshTrigger} />
        </section>
      </main>

      <footer className="petition-footer">
        <p>Obrigado pelo seu apoio!</p>
      </footer>
    </div>
  )
}

export default Petition
