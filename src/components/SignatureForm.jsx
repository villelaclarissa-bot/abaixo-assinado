import { useState, useRef } from 'react'
import SignatureCanvas from './SignatureCanvas'
import { supabase } from '../lib/supabase'
import './SignatureForm.css'

function SignatureForm({ onSignatureAdded }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const canvasRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!name.trim()) {
      setError('Por favor, digite seu nome')
      return
    }

    if (canvasRef.current.isEmpty()) {
      setError('Por favor, desenhe sua rubrica')
      return
    }

    setLoading(true)

    try {
      const signatureImage = canvasRef.current.toDataURL()

      const { error: insertError } = await supabase
        .from('signatures')
        .insert([{ name: name.trim(), signature_image: signatureImage }])

      if (insertError) throw insertError

      setSuccess(true)
      setName('')
      canvasRef.current.clear()

      if (onSignatureAdded) {
        onSignatureAdded()
      }
    } catch (err) {
      setError('Erro ao enviar assinatura. Tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    canvasRef.current.clear()
  }

  return (
    <form className="signature-form" onSubmit={handleSubmit}>
      <h2>Assine o Abaixo-Assinado</h2>

      <div className="form-group">
        <label htmlFor="name">Seu Nome Completo</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Sua Rubrica</label>
        <SignatureCanvas ref={canvasRef} />
        <button
          type="button"
          className="btn-clear"
          onClick={handleClear}
          disabled={loading}
        >
          Limpar
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Assinatura enviada com sucesso!</p>}

      <button
        type="submit"
        className="btn-submit"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Assinar'}
      </button>
    </form>
  )
}

export default SignatureForm
