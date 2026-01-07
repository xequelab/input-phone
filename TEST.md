# Testes do Componente

## ✅ Correções Aplicadas

### 1. **Dropdown sendo cortado**
**Problema:** Dropdown era cortado pelo container pai com overflow hidden
**Solução:**
- Mudei de `position: absolute` para `position: fixed`
- Aumentei z-index de 1000 para 9999
- Adicionei cálculo dinâmico de posição baseado no botão

**Como testar:**
1. Adicione o componente em um container com altura limitada
2. Clique no seletor de país
3. Dropdown deve aparecer completo, sem ser cortado

### 2. **Máscara não formatando**
**Problema:** Input não formatava porque handleInput verificava `isEditing` e retornava
**Solução:**
- Removi `isEditing` do guard do handleInput
- Mantive apenas `disabled` e `readonly`
- Eventos só são emitidos fora do editor, mas formatação funciona sempre

**Como testar:**
1. Digite números no campo (ex: 11999887766)
2. Deve formatar automaticamente para: (11) 99988-7766
3. Cursor deve manter posição correta

## 🧪 Testes a Fazer

### Teste 1: Formatação Brasil
```
Input: 11999887766
Esperado: (11) 99988-7766
```

### Teste 2: Formatação USA
```
Mudar país para US
Input: 5551234567
Esperado: (555) 123-4567
```

### Teste 3: Troca de País
```
1. Digite: 11999887766 (Brasil)
2. Mude para Portugal (PT)
3. Número deve manter dígitos mas reformatar: 119 998 877
```

### Teste 4: Validação
```
Brasil (11 dígitos):
- 1199988776 (10 dígitos) = INVÁLIDO (borda vermelha)
- 11999887766 (11 dígitos) = VÁLIDO (borda verde)
```

### Teste 5: Dropdown em Container Pequeno
```
1. Coloque componente em container com:
   - height: 200px
   - overflow: hidden
2. Clique no seletor de país
3. Dropdown deve aparecer FORA do container (fixed position)
```

### Teste 6: Busca de País
```
1. Clique no seletor
2. Digite "port" na busca
3. Deve mostrar: Portugal
4. Selecione Portugal
5. Dial code deve mudar para +351
```

## 🐛 Se ainda não funcionar

### Debug 1: Verifique o Console
```javascript
// Abra DevTools (F12)
// Console deve mostrar:
variables['uid-rawValue']           // "11999887766"
variables['uid-value']              // "(11) 99988-7766"
variables['uid-internationalNumber'] // "+5511999887766"
variables['uid-isValid']            // true/false
```

### Debug 2: Verifique WeWeb
1. No editor, clique no componente
2. Vá em "Variables" (lado direito)
3. Procure pelas variáveis do componente
4. Elas devem estar atualizando conforme você digita

### Debug 3: Cache do Navegador
Se não funcionar:
1. Ctrl + Shift + R (hard refresh)
2. Ou limpe o cache do navegador
3. Recarregue o editor WeWeb

## 📝 Notas Técnicas

### Mudanças no CountrySelector.vue
```scss
// ANTES
.dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 1000;
}

// DEPOIS
.dropdown {
  position: fixed;
  // top e left calculados dinamicamente
  z-index: 9999;
}
```

### Mudanças no wwElement.vue
```javascript
// ANTES
const handleInput = (event) => {
  if (isEditing.value || disabled.value || readonly.value) return;
  // ... resto do código
}

// DEPOIS
const handleInput = (event) => {
  if (disabled.value || readonly.value) return;
  // Formatação funciona sempre
  // Eventos só emitem se !isEditing
}
```

## ✅ Checklist Final

- [ ] Dropdown aparece completo (não cortado)
- [ ] Números formatam automaticamente
- [ ] Cursor mantém posição ao digitar
- [ ] Mudança de país reformata número
- [ ] Validação mostra borda verde/vermelha
- [ ] Busca de países funciona
- [ ] Variáveis atualizam no WeWeb
- [ ] Placeholder mostra formato correto

---

**Versão:** 1.0.1
**Data:** 2026-01-07
**Commits:**
- 94b0fb3 - Initial commit
- 2cd1500 - Fix: Dropdown overflow and input formatting
