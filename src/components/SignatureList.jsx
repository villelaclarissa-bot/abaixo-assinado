import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './SignatureList.css'

function SignatureList({ refreshTrigger }) {
  const [signatures, setSignatures] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSignatures = async () => {
    try {
      const { data, error } = await supabase
        .from('signatures')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setSignatures(data || [])
    } catch (err) {
      console.error('Erro ao carregar assinaturas:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSignatures()
  }, [refreshTrigger])

  if (loading) {
    return <div className="signature-list-loading">Carregando assinaturas...</div>
  }

  return (
    <div className="signature-list">
      <div className="signature-counter">
        <span className="counter-number">{signatures.length}</span>
        <span className="counter-label">
          {signatures.length === 1 ? 'pessoa assinou' : 'pessoas assinaram'}
        </span>
      </div>

      {signatures.length > 0 && (
        <div className="signatures-grid">
          {signatures.map((sig) => (
            <div key={sig.id} className="signature-card">
              <img
                src={sig.signature_image}
                alt={`Assinatura de ${sig.name}`}
                className="signature-image"
              />
              <p className="signature-name">{sig.name}</p>
              <p className="signature-date">
                {new Date(sig.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          ))}
        </div>
      )}

      {signatures.length === 0 && (
        <p className="no-signatures">Seja o primeiro a assinar!</p>
      )}
    </div>
  )
}

export default SignatureList
