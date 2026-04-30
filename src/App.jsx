import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, BarChart3, Target, AlertTriangle, Database, Settings, Activity, Award, PlayCircle, Briefcase, GitCompare, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// --- DATA ---
const targetData = [
  { name: 'Paga (Fully Paid)', value: 86, color: '#A8E6CF' },
  { name: 'Incumple (Charged Off)', value: 14, color: '#FF8B94' }
];

const balancedData = [
  { name: 'Paga (Fully Paid)', value: 50, color: '#A8E6CF' },
  { name: 'Incumple (Charged Off)', value: 50, color: '#FF8B94' }
];

const featureImportanceData = [
  { name: 'Plazo del Préstamo', value: 1.7 },
  { name: 'Propósito: Consolid.', value: 1.8 },
  { name: 'Antigüedad Laboral', value: 10.2 },
  { name: 'Monto Préstamo', value: 18.4 },
  { name: 'Ingreso Anual', value: 23.1 },
  { name: 'Tasa de Interés', value: 23.3 }
];

const modelRankingData = [
  { name: 'Regresión Logística', f1: 0.6405 },
  { name: 'SVM', f1: 0.6689 },
  { name: 'Red Neuronal Artificial', f1: 0.6855 },
  { name: 'KNN', f1: 0.7978 },
  { name: 'Decision Tree', f1: 0.8875 },
  { name: 'Random Forest', f1: 0.9345 },
  { name: 'Adaptive Boosting', f1: 0.9450 },
  { name: 'Extra Trees', f1: 0.9483 },
  { name: 'Gradient Boosting', f1: 0.9497 }
];

const gradeData = [
  { name: 'A', count: 6000 },
  { name: 'B', count: 11000 },
  { name: 'C', count: 10500 },
  { name: 'D', count: 6000 },
  { name: 'E', count: 3500 },
  { name: 'F', count: 1200 },
  { name: 'G', count: 500 }
];

const loanAmntData = [
  { name: '< 5k', count: 5000 },
  { name: '5k-10k', count: 12000 },
  { name: '10k-15k', count: 9000 },
  { name: '15k-20k', count: 6000 },
  { name: '20k-25k', count: 4000 },
  { name: '25k-35k', count: 2705 }
];

const intRateData = [
  { name: '< 10%', count: 8000 },
  { name: '10-14%', count: 18000 },
  { name: '15-19%', count: 9500 },
  { name: '20-25%', count: 3205 }
];

const annualIncData = [
  { name: '< 40k', count: 6000 },
  { name: '40-60k', count: 12000 },
  { name: '60-80k', count: 9000 },
  { name: '80-100k', count: 6000 },
  { name: '> 100k', count: 5705 }
];

const empLengthData = [
  { name: '< 1 año', count: 3500 },
  { name: '1-3 años', count: 8000 },
  { name: '4-6 años', count: 6500 },
  { name: '7-9 años', count: 4500 },
  { name: '10+ años', count: 16205 }
];

const purposeData = [
  { name: 'Deuda', count: 22000 },
  { name: 'Tarjetas', count: 8500 },
  { name: 'Hogar', count: 2500 },
  { name: 'Otros', count: 5705 }
];

// --- SLIDE COMPONENTS ---
const Slide1 = () => (
  <div className="slide-center">
    <div className="icon-wrapper shadow-mint">
      <BarChart3 size={100} className="text-mint" />
    </div>
    <h1 className="title-large">Modelo Predictivo de Riesgo</h1>
    <h2 className="subtitle">Clasificación de Préstamos P2P</h2>
    <p className="description mt-large text-large">
      Presentación del Modelo de Machine Learning
    </p>
  </div>
);

const Slide2 = () => (
  <div className="slide-content">
    <h2 className="slide-title"><AlertTriangle size={48} className="mr" /> El Desafío: P2P Lending</h2>
    <div className="grid-2 gap-large mt-large">
      <div className="glass-card hover-lift">
        <h3 className="card-title text-large mb-large text-mint">Riesgo Directo</h3>
        <p className="description text-medium">Los préstamos Peer-to-Peer conectan directamente a prestatarios con inversores. Esto elimina intermediarios pero transfiere el riesgo.</p>
      </div>
      <div className="glass-card hover-lift">
        <h3 className="card-title text-large mb-large text-pink">El Problema</h3>
        <p className="description text-medium">El riesgo principal es el <b>incumplimiento (Charged Off)</b>.</p>
        <p className="description text-medium mt text-pink bold">Aprobar a alguien que no pagará (Falso Negativo) significa pérdidas directas para el prestamista.</p>
      </div>
    </div>
  </div>
);

const Slide3 = () => (
  <div className="slide-center">
    <h2 className="slide-title center"><Target size={48} className="mr" /> El Objetivo</h2>
    <div className="glass-card large-card text-center p-large">
      <Target size={80} className="text-mint mx-auto mb-large" />
      <p className="description text-large">
        Desarrollar un modelo de <span className="text-pink bold">Machine Learning</span> capaz de predecir si un usuario incumplirá basándose en sus datos al momento de la solicitud.
      </p>
      <div className="divider flex-around mt-large pt text-medium bold">
        <div>Mitigar Riesgo</div>
        <div>Automatizar Decisiones</div>
      </div>
    </div>
  </div>
);

const Slide4 = () => (
  <div className="slide-content">
    <h2 className="slide-title"><Database size={48} className="mr" /> Datos Históricos</h2>
    <div className="grid-2 gap-large mb-large">
      {[{l: "Total de Registros", v: "38,705"}, {l: "Variables Estudiadas", v: "10"}].map((k, i) => (
        <div key={i} className="glass-card text-center p-large">
          <div className="text-mint text-medium mb-small bold">{k.l}</div>
          <div className="text-xlarge bold text-white">{k.v}</div>
        </div>
      ))}
    </div>
    <div className="glass-card p-large text-center">
      <p className="description text-medium">Dataset estructurado con información sociodemográfica y financiera reunida <b>antes</b> de la aprobación del crédito.</p>
    </div>
  </div>
);

const Slide5 = () => (
  <div className="slide-content">
    <h2 className="slide-title">Variable Objetivo (El Desbalanceo)</h2>
    <div className="glass-card flex-row gap-large p-large">
      <div className="chart-container-large half-width">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={targetData} innerRadius={100} outerRadius={160} paddingAngle={5} dataKey="value">
              {targetData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1A202C', borderColor: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '1.5rem' }} formatter={(val) => `${val}%`} />
            <Legend wrapperStyle={{ fontSize: '1.5rem' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="half-width description text-medium">
        <p>En el mundo real, solo el <b>14%</b> incumple.</p>
        <p className="mt-large">Si creamos un modelo ciego que siempre diga "Paga", tendría 86% de Accuracy... <span className="text-pink">Pero no atraparía a ningún posible moroso</span></p>
      </div>
    </div>
  </div>
);

const Slide6 = () => (
  <div className="slide-content">
    <h2 className="slide-title">Variables Clave (1/2)</h2>
    <div className="grid-2 gap-large mt-large">
      <div className="glass-card p-large">
        <h4 className="text-mint bold text-large mb-large">Financieras</h4>
        <ul className="description text-medium list-disc ml-large">
          <li className="mb"><b>annual_inc:</b> Ingreso Anual declarado.<br/><span className="text-small text-gray-400">Rango: $4k a $6M</span></li>
          <li className="mb"><b>loan_amnt:</b> Monto Solicitado.<br/><span className="text-small text-gray-400">Rango: $500 a $35k</span></li>
          <li><b>int_rate:</b> Tasa de Interés asignada.<br/><span className="text-small text-gray-400">Rango: 5.4% a 24.6%</span></li>
        </ul>
      </div>
      <div className="glass-card p-large">
        <h4 className="text-mint bold text-large mb-large">Crediticias</h4>
        <ul className="description text-medium list-disc ml-large">
          <li className="mb"><b>grade:</b> Calificación de Riesgo.<br/><span className="text-small text-gray-400">Rango: A (Mejor) a G (Peor)</span></li>
          <li><b>term:</b> Plazo del Préstamo.<br/><span className="text-small text-gray-400">Valores: 36 o 60 meses</span></li>
        </ul>
      </div>
    </div>
  </div>
);

const Slide7 = () => (
  <div className="slide-content">
    <h2 className="slide-title">Variables Clave (2/2)</h2>
    <div className="grid-2 gap-large mt-large">
      <div className="glass-card p-large">
        <h4 className="text-mint bold text-large mb-large">Laborales</h4>
        <ul className="description text-medium list-disc ml-large">
          <li className="mb"><b>emp_length:</b> Antigüedad Laboral.<br/><span className="text-small text-gray-400">Rango: {'<'} 1 año a 10+ años</span></li>
          <li><b>verification_status:</b> Ingresos verificados.<br/><span className="text-small text-gray-400">(Verificado / No Verificado)</span></li>
        </ul>
      </div>
      <div className="glass-card p-large">
        <h4 className="text-mint bold text-large mb-large">Personales</h4>
        <ul className="description text-medium list-disc ml-large">
          <li className="mb"><b>purpose:</b> Propósito del crédito.<br/><span className="text-small text-gray-400">(Consolidación, Casa, Boda, etc)</span></li>
          <li><b>home_ownership:</b> Situación de Vivienda.<br/><span className="text-small text-gray-400">(Alquiler, Propia, Hipoteca)</span></li>
        </ul>
      </div>
    </div>
  </div>
);

const SlideDist1 = () => (
  <div className="slide-content">
    <h2 className="slide-title">Distribución: Montos y Calificación</h2>
    <p className="description text-medium mb-large text-center">Observemos cómo se distribuye la cartera de préstamos.</p>
    
    <div className="grid-2 gap-large">
      <div className="glass-card flex-col-center p-small">
        <h3 className="card-title text-medium text-mint mb text-center">Calificación de Riesgo (Grade)</h3>
        <div className="chart-container-medium w-100" style={{width: '100%'}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#A8E6CF" fontSize={14} />
              <YAxis stroke="#A8E6CF" fontSize={14} />
              <Tooltip contentStyle={{ backgroundColor: '#1A202C', borderColor: 'rgba(255,255,255,0.1)' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
              <Bar dataKey="count" fill="#FFAAA5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="description text-small mt text-center">Las categorías B y C dominan. Riesgos altos (F, G) son raros.</p>
      </div>

      <div className="glass-card flex-col-center p-small">
        <h3 className="card-title text-medium text-mint mb text-center">Montos Solicitados ($)</h3>
        <div className="chart-container-medium w-100" style={{width: '100%'}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={loanAmntData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#A8E6CF" fontSize={12} />
              <YAxis stroke="#A8E6CF" fontSize={14} />
              <Tooltip contentStyle={{ backgroundColor: '#1A202C', borderColor: 'rgba(255,255,255,0.1)' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
              <Bar dataKey="count" fill="#A8E6CF" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="description text-small mt text-center">El grueso de los préstamos se ubica entre $5,000 y $15,000.</p>
      </div>
    </div>
  </div>
);

const SlideDist2 = () => (
  <div className="slide-content">
    <h2 className="slide-title">Distribución: Ingresos y Tasas</h2>
    <p className="description text-medium mb-large text-center">Las dos variables matemáticas que más pesan en nuestro modelo.</p>
    
    <div className="grid-2 gap-large">
      <div className="glass-card flex-col-center p-small">
        <h3 className="card-title text-medium text-mint mb text-center">Tasa de Interés Asignada (%)</h3>
        <div className="chart-container-medium w-100" style={{width: '100%'}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={intRateData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#A8E6CF" fontSize={14} />
              <YAxis stroke="#A8E6CF" fontSize={14} />
              <Tooltip contentStyle={{ backgroundColor: '#1A202C', borderColor: 'rgba(255,255,255,0.1)' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
              <Bar dataKey="count" fill="#FFAAA5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="description text-small mt text-center">La mayoría se aprueba entre el 10% y el 15% de interés.</p>
      </div>

      <div className="glass-card flex-col-center p-small">
        <h3 className="card-title text-medium text-mint mb text-center">Ingreso Anual Declarado ($)</h3>
        <div className="chart-container-medium w-100" style={{width: '100%'}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={annualIncData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#A8E6CF" fontSize={12} />
              <YAxis stroke="#A8E6CF" fontSize={14} />
              <Tooltip contentStyle={{ backgroundColor: '#1A202C', borderColor: 'rgba(255,255,255,0.1)' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
              <Bar dataKey="count" fill="#A8E6CF" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="description text-small mt text-center">Se concentra fuertemente en sueldos de 40k a 80k dólares anuales.</p>
      </div>
    </div>
  </div>
);

const SlideDist3 = () => (
  <div className="slide-content">
    <h2 className="slide-title">Distribución: Perfil del Usuario</h2>
    <p className="description text-medium mb-large text-center">¿Quiénes son nuestros clientes y por qué piden dinero?</p>
    
    <div className="grid-2 gap-large">
      <div className="glass-card flex-col-center p-small">
        <h3 className="card-title text-medium text-mint mb text-center">Antigüedad Laboral</h3>
        <div className="chart-container-medium w-100" style={{width: '100%'}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={empLengthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#A8E6CF" fontSize={12} />
              <YAxis stroke="#A8E6CF" fontSize={14} />
              <Tooltip contentStyle={{ backgroundColor: '#1A202C', borderColor: 'rgba(255,255,255,0.1)' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
              <Bar dataKey="count" fill="#FFAAA5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="description text-small mt text-center">Gran participación de personas muy estables (10+ años en el mismo trabajo).</p>
      </div>

      <div className="glass-card flex-col-center p-small">
        <h3 className="card-title text-medium text-mint mb text-center">Propósito del Préstamo</h3>
        <div className="chart-container-medium w-100" style={{width: '100%'}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={purposeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#A8E6CF" fontSize={14} />
              <YAxis stroke="#A8E6CF" fontSize={14} />
              <Tooltip contentStyle={{ backgroundColor: '#1A202C', borderColor: 'rgba(255,255,255,0.1)' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
              <Bar dataKey="count" fill="#A8E6CF" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="description text-small mt text-center">Más del 50% solicita el dinero para consolidar deudas previas.</p>
      </div>
    </div>
  </div>
);

const Slide8 = () => (
  <div className="slide-content">
    <h2 className="slide-title"><Settings size={48} className="mr" /> Ingeniería de Datos</h2>
    <div className="grid-2 gap-large mt-large">
      <div className="glass-card">
        <h4 className="text-mint bold text-medium mb-small">1. Conversión Numérica</h4>
        <p className="description text-small">Limpieza de textos ("10.5%" → 10.5, "36 months" → 36). El modelo requiere matemáticas puras.</p>
      </div>
      <div className="glass-card">
        <h4 className="text-mint bold text-medium mb-small">2. Mapeo Ordinal</h4>
        <p className="description text-small">"10+ years" a 10. Le enseña al algoritmo que más años significa más estabilidad linealmente.</p>
      </div>
      <div className="glass-card">
        <h4 className="text-mint bold text-medium mb-small">3. Clipping (Outliers)</h4>
        <p className="description text-small">Limitar ingresos millonarios (Percentil 99) para que no distorsionen el entrenamiento de los árboles.</p>
      </div>
      <div className="glass-card">
        <h4 className="text-mint bold text-medium mb-small">4. Limpieza Estructural</h4>
        <p className="description text-small">Eliminación de espacios y caracteres invisibles en variables categóricas.</p>
      </div>
    </div>
  </div>
);

const Slide9 = () => (
  <div className="slide-content">
    <h2 className="slide-title">Manejo del Desbalanceo</h2>
    <div className="glass-card flex-row gap-large p-large">
      <div className="half-width description text-medium">
        <p>Aplicamos técnicas de <b>Resampling</b> sobre los datos de entrenamiento para igualar las clases.</p>
        <p className="mt-large text-mint bold">Le damos al algoritmo una base perfectamente balanceada (50/50), obligándolo a aprender patrones reales.</p>
      </div>
      <div className="chart-container half-width">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={balancedData} innerRadius={80} outerRadius={130} paddingAngle={5} dataKey="value">
              {balancedData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1A202C', borderColor: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '1.2rem' }} formatter={(val) => `${val}%`} />
            <Legend wrapperStyle={{ fontSize: '1.2rem' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const Slide10 = () => (
  <div className="slide-content">
    <h2 className="slide-title">Comparativa: Los 9 Algoritmos</h2>
    <div className="glass-card chart-container-large p-large">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={modelRankingData} layout="vertical" margin={{ top: 20, right: 30, left: 180, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.1)" />
          <XAxis type="number" domain={[0.6, 1]} stroke="#A8E6CF" fontSize={16} />
          <YAxis dataKey="name" type="category" stroke="#A8E6CF" fontSize={18} />
          <Tooltip contentStyle={{ backgroundColor: '#1A202C', borderColor: 'rgba(255,255,255,0.1)', color: 'white' }} />
          <Bar dataKey="f1" fill="#FFAAA5" radius={[0, 10, 10, 0]} label={{ position: 'right', fill: '#fff', fontSize: 16, formatter: (v) => v.toFixed(4) }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const Slide11 = () => (
  <div className="slide-content">
    <h2 className="slide-title"><Activity size={48} className="mr" /> La Métrica Real (Recall)</h2>
    <div className="grid-2 gap-large mt-large">
      <div className="glass-card p-large">
        <h3 className="card-title text-large text-mint mb-large">Lo que NO nos importa</h3>
        <p className="description text-medium">El "Accuracy" o Precisión Global engaña. Es fácil predecir que alguien bueno va a pagar.</p>
      </div>
      <div className="glass-card p-large">
        <h3 className="card-title text-large text-pink mb-large">Lo que sí importa</h3>
        <p className="description text-medium">El <b>Recall de Incumplimiento</b>. Preferimos rechazar por error a un cliente bueno, antes que aprobar por error a un estafador.</p>
      </div>
    </div>
  </div>
);

const Slide12 = () => (
  <div className="slide-content">
    <h2 className="slide-title"><GitCompare size={48} className="mr" /> Evolución del Modelo (Matrices)</h2>
    <p className="description text-center text-medium mb-large">Comparamos cómo dos algoritmos detectan el peligro. <br/><span className="text-small text-pink">(Pasa el ratón por las celdas para ver qué significan)</span></p>
    <div className="grid-2 gap-large">
      
      {/* Modelo Débil */}
      <div className="glass-card p-small">
        <h3 className="text-large text-center bold text-white mb-large">Regresión Logística</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="matrix-axis-label matrix-y-axis" style={{ fontSize: '0.85rem' }}>Realidad</div>
          <div style={{ flex: 1, width: '100%' }}>
            <div className="matrix-axis-label matrix-x-axis" style={{ fontSize: '0.85rem' }}>Predicción</div>
            <div className="matrix-grid">
              <div className="matrix-cell bg-mint-light matrix-interactive">
                <div className="matrix-tooltip">Buenos clientes aprobados correctamente.</div>
                <span className="text-small text-gray-300">Pagan (TN)</span><br/><span className="text-large bold">5,000</span>
              </div>
              <div className="matrix-cell bg-red-light matrix-interactive">
                <div className="matrix-tooltip">Buenos clientes rechazados por error.</div>
                <span className="text-small text-gray-300">Error (FP)</span><br/><span className="text-large bold text-red">4,961</span>
              </div>
              <div className="matrix-cell bg-red-light matrix-interactive" style={{border: '2px solid #f87171'}}>
                <div className="matrix-tooltip text-pink">PELIGRO: Malos clientes que el modelo aprobó.</div>
                <span className="text-small text-pink bold">Peligro (FN)</span><br/><span className="text-large bold text-red">3,100</span>
              </div>
              <div className="matrix-cell bg-pink-light matrix-interactive">
                <div className="matrix-tooltip">Malos clientes bloqueados correctamente.</div>
                <span className="text-small text-gray-300">Bloqueados (TP)</span><br/><span className="text-large bold text-pink">6,898</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modelo Medio */}
      <div className="glass-card p-small">
        <h3 className="text-large text-center bold text-white mb-large">Random Forest</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="matrix-axis-label matrix-y-axis" style={{ fontSize: '0.85rem' }}>Realidad</div>
          <div style={{ flex: 1, width: '100%' }}>
            <div className="matrix-axis-label matrix-x-axis" style={{ fontSize: '0.85rem' }}>Predicción</div>
            <div className="matrix-grid">
              <div className="matrix-cell bg-mint-light matrix-interactive">
                <div className="matrix-tooltip">Buenos clientes aprobados correctamente.</div>
                <span className="text-small text-gray-300">Pagan (TN)</span><br/><span className="text-large bold">8,500</span>
              </div>
              <div className="matrix-cell bg-red-light matrix-interactive">
                <div className="matrix-tooltip">Buenos clientes rechazados por error.</div>
                <span className="text-small text-gray-300">Error (FP)</span><br/><span className="text-large bold text-red">1,461</span>
              </div>
              <div className="matrix-cell bg-red-light matrix-interactive" style={{border: '2px solid #f87171'}}>
                <div className="matrix-tooltip text-pink">Aún se escapan algunos morosos.</div>
                <span className="text-small text-pink bold">Peligro (FN)</span><br/><span className="text-large bold text-red">450</span>
              </div>
              <div className="matrix-cell bg-pink-light matrix-interactive">
                <div className="matrix-tooltip">Malos clientes bloqueados correctamente.</div>
                <span className="text-small text-gray-300">Bloqueados (TP)</span><br/><span className="text-large bold text-pink">9,548</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
);

const Slide13 = () => (
  <div className="slide-center">
    <h2 className="slide-title center mb-0"><Award size={48} className="mr" /> La Matriz Definitiva</h2>
    <p className="description text-medium text-center mb-large mt-small">El desempeño de nuestro mejor modelo evaluado en datos nunca antes vistos.</p>
    
    <div className="glass-card gradient-border p-large" style={{ maxWidth: '800px', width: '100%' }}>
      <h3 className="text-xlarge text-center bold text-mint mb-large">Gradient Boosting</h3>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="matrix-axis-label matrix-y-axis" style={{ fontSize: '1.2rem' }}>Realidad</div>
        
        <div style={{ flex: 1 }}>
          <div className="matrix-axis-label matrix-x-axis" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Predicción del Modelo</div>
          <div className="matrix-grid" style={{ gap: '0' }}>
            
            <div className="matrix-cell bg-mint-light matrix-interactive">
              <div className="matrix-tooltip">Personas que sí pagan y el modelo las aprobó correctamente.</div>
              <span className="text-small text-mint mb-small">Pagan y Dice Paga</span><br/>
              <span className="text-large bold">9,463</span>
            </div>
            
            <div className="matrix-cell bg-red-light matrix-interactive">
              <div className="matrix-tooltip">Coste de Oportunidad: Personas que pagan pero fueron rechazadas por precaución.</div>
              <span className="text-small text-gray-300 mb-small">Pagan y Rechaza</span><br/>
              <span className="text-large bold text-red">498</span>
            </div>
            
            <div className="matrix-cell bg-red-light matrix-interactive" style={{ border: '3px solid #f87171' }}>
              <div className="matrix-tooltip" style={{ fontSize: '1.2rem' }}>EL RIESGO: Malos clientes que engañaron al modelo. Solo 100 de 19,000.</div>
              <span className="text-small text-pink bold mb-small">Morosos que Aprobó</span><br/>
              <span className="text-large bold text-red">100</span>
            </div>
            
            <div className="matrix-cell bg-mint-light matrix-interactive" style={{ border: '3px solid #A8E6CF' }}>
              <div className="matrix-tooltip">ÉXITO: Todas las pérdidas millonarias que el modelo evitó.</div>
              <span className="text-small text-mint bold mb-small">Morosos Bloqueados</span><br/>
              <span className="text-large bold text-mint">9,898</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Slide14 = () => (
  <div className="slide-center">
    <h2 className="slide-title center mb-large"><Award size={60} className="mr" /> El Modelo Ganador</h2>
    <div className="glass-card large-card text-center gradient-border p-large mt-large">
      <h3 className="text-xlarge bold text-white mb-large">Gradient Boosting Classifier</h3>
      <div className="flex-around mt-large pt">
        <div>
          <div className="text-xlarge bold text-mint" style={{ fontSize: '5rem' }}>97.0%</div>
          <div className="description text-medium mt">Accuracy General</div>
        </div>
        <div>
          <div className="text-xlarge bold text-pink" style={{ fontSize: '5rem' }}>99.0%</div>
          <div className="description text-medium mt text-pink bold">Recall de Incumplimiento</div>
        </div>
      </div>
      <p className="description text-large mt-large pt">Atrapa a 99 de cada 100 morosos reales.</p>
    </div>
  </div>
);

const Slide15 = () => (
  <div className="slide-content">
    <h2 className="slide-title">Importancia de Variables (Top 6)</h2>
    <div className="glass-card flex-row gap-large p-large h-400 mt-large">
      <div className="chart-container-large two-thirds">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={featureImportanceData} layout="vertical" margin={{ top: 20, right: 30, left: 160, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis type="number" stroke="#A8E6CF" fontSize={16} />
            <YAxis dataKey="name" type="category" stroke="#A8E6CF" fontSize={16} />
            <Tooltip contentStyle={{ backgroundColor: '#1A202C', borderColor: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '1.2rem' }} />
            <Bar dataKey="value" fill="#A8E6CF" radius={[0, 10, 10, 0]} label={{ position: 'right', fill: '#fff', fontSize: 16, formatter: (v) => `${v}%` }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="one-third description flex-col-center text-medium">
        <p>La <b>Tasa de Interés</b> y el <b>Ingreso Anual</b> tienen el peso absoluto.</p>
        <p className="mt-large">El modelo demuestra que el riesgo es estrictamente matemático y financiero, ignorando sesgos humanos como el motivo del préstamo.</p>
      </div>
    </div>
  </div>
);

const Slide16 = () => (
  <div className="slide-center">
    <h2 className="slide-title center mb-large"><Zap size={60} className="mr" /> El Pipeline Predictivo</h2>
    <div className="glass-card large-card p-large text-center">
      <h3 className="text-large text-mint bold mb-large">De datos crudos a decisiones</h3>
      <p className="description text-medium mb-large">El modelo `.pkl` no es solo un algoritmo. Tiene acoplado un <b>Pipeline</b> (una tubería de procesamiento) que hace todo el trabajo sucio automáticamente.</p>
      
      <div className="flex-row gap-small mt-large pt">
        <div className="bg-white/10 p-small rounded text-white bold">1. Formulario Crudo</div>
        <ChevronRight size={30} className="text-mint" />
        <div className="bg-white/10 p-small rounded text-mint">2. Limpieza (Strip)</div>
        <ChevronRight size={30} className="text-mint" />
        <div className="bg-white/10 p-small rounded text-mint">3. Transformación Numérica</div>
        <ChevronRight size={30} className="text-mint" />
        <div className="bg-white/10 p-small rounded text-pink bold">4. Gradient Boosting</div>
      </div>
      <p className="text-mint bold text-medium mt-large pt">Solo se ingresa el texto crudo y el pipeline se encargara de todo.</p>
    </div>
  </div>
);

const Slide17 = () => {
  const [loanAmnt, setLoanAmnt] = useState(15000);
  const [annualInc, setAnnualInc] = useState(50000);
  const [intRate, setIntRate] = useState(10.5);
  const [grade, setGrade] = useState('B');
  const [empLength, setEmpLength] = useState('5 years');
  const [term, setTerm] = useState(' 36 months');
  const [purpose, setPurpose] = useState('debt_consolidation');
  const [homeOwnership, setHomeOwnership] = useState('RENT');
  const [verificationStatus, setVerificationStatus] = useState('Verified');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSimulate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const response = await fetch('https://api-p2p-sr3e.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loan_amnt: loanAmnt,
          int_rate: intRate,
          annual_inc: annualInc,
          grade: grade,
          emp_length: empLength,
          verification_status: verificationStatus,
          home_ownership: homeOwnership,
          purpose: purpose,
          term: term
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(data.prob_incumple);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Error conectando con la API en la nube. (Asegúrate de que Render esté activo)");
    }
    
    setLoading(false);
  };

  return (
    <div className="slide-content">
      <h2 className="slide-title"><PlayCircle size={48} className="mr" /> Simulador en Producción</h2>
      <div className="grid-2 gap-large">
        <form onSubmit={handleSimulate} className="glass-card flex-col overflow-y-auto pr-small" style={{ maxHeight: '70vh' }}>
          <h3 className="card-title text-mint mb-large" style={{ textAlign: 'center', fontSize: '1.8rem' }}>Ingresa los Datos</h3>
          
          <div className="grid-3 gap-small mb">
            <div className="form-group mb-0">
              <label className="label-text">Ingreso ($)</label>
              <input type="number" value={annualInc} onChange={e => setAnnualInc(Number(e.target.value))} className="input-field" style={{padding: '0.75rem'}} />
            </div>
            <div className="form-group mb-0">
              <label className="label-text">Monto ($)</label>
              <input type="number" value={loanAmnt} onChange={e => setLoanAmnt(Number(e.target.value))} className="input-field" style={{padding: '0.75rem'}} />
            </div>
            <div className="form-group mb-0">
              <label className="label-text">Tasa (%)</label>
              <input type="number" step="0.1" value={intRate} onChange={e => setIntRate(Number(e.target.value))} className="input-field" style={{padding: '0.75rem'}} />
            </div>
          </div>
          
          <div className="grid-3 gap-small mb">
            <div className="form-group mb-0">
              <label className="label-text">Grade</label>
              <select value={grade} onChange={e => setGrade(e.target.value)} className="select-field" style={{padding: '0.75rem'}}>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="form-group mb-0">
              <label className="label-text">Antigüedad</label>
              <select value={empLength} onChange={e => setEmpLength(e.target.value)} className="select-field" style={{padding: '0.75rem'}}>
                {['< 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years', '9 years', '10+ years'].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="form-group mb-0">
              <label className="label-text">Plazo</label>
              <select value={term} onChange={e => setTerm(e.target.value)} className="select-field" style={{padding: '0.75rem'}}>
                <option value=" 36 months">36 Meses</option>
                <option value=" 60 months">60 Meses</option>
              </select>
            </div>
          </div>

          <div className="grid-3 gap-small mb-large">
            <div className="form-group mb-0">
              <label className="label-text">Propósito</label>
              <select value={purpose} onChange={e => setPurpose(e.target.value)} className="select-field" style={{padding: '0.75rem'}}>
                <option value="debt_consolidation">Consolidar Deuda</option>
                <option value="credit_card">Tarjetas</option>
                <option value="home_improvement">Hogar</option>
                <option value="small_business">Negocio</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div className="form-group mb-0">
              <label className="label-text">Vivienda</label>
              <select value={homeOwnership} onChange={e => setHomeOwnership(e.target.value)} className="select-field" style={{padding: '0.75rem'}}>
                <option value="RENT">Alquiler</option>
                <option value="OWN">Propia</option>
                <option value="MORTGAGE">Hipoteca</option>
                <option value="OTHER">Otra</option>
              </select>
            </div>
            <div className="form-group mb-0">
              <label className="label-text">Ingresos Verif.</label>
              <select value={verificationStatus} onChange={e => setVerificationStatus(e.target.value)} className="select-field" style={{padding: '0.75rem'}}>
                <option value="Not Verified">No Verificado</option>
                <option value="Verified">Verificado</option>
                <option value="Source Verified">Fuente Verificada</option>
              </select>
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="nav-btn primary text-large bold" style={{borderRadius: '0.75rem', width: '100%', padding: '1rem'}}>
            {loading ? 'Llamando Pipeline...' : 'Evaluar Riesgo'}
          </button>
        </form>
        
        <div className="glass-card flex-col-center text-center">
          <h3 className="card-title text-white mb-large" style={{ fontSize: '1.8rem' }}>Veredicto del Algoritmo</h3>
          
          {!result && !loading && !error && (
            <p className="description large-text mt-large">Conectado a Python local.<br/><br/>Ingresa datos en crudo para que el Pipeline los procese y el modelo prediga.</p>
          )}
          
          {loading && (
            <div className="animate-pulse mt-large">
              <Activity size={100} className="text-mint mx-auto mb" />
              <p className="text-mint bold text-large">Consultando modelo...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-light border border-red p-small rounded text-red bold text-large mt-large">
              {error}
            </div>
          )}
          
          {result !== null && !loading && (
            <div className="fade-in" style={{ width: '100%' }}>
              <div className="text-xlarge bold" style={{ fontSize: '5rem', color: result > 0.5 ? '#f87171' : '#A8E6CF' }}>
                {(result * 100).toFixed(1)}%
              </div>
              <p className="description text-large bold">Probabilidad de Incumplimiento</p>
              
              <div className="gauge-container">
                <div 
                  className="gauge-fill" 
                  style={{ 
                    width: `${result * 100}%`, 
                    backgroundColor: result > 0.5 ? '#f87171' : '#A8E6CF',
                    boxShadow: result > 0.5 ? '0 0 15px rgba(248, 113, 113, 0.6)' : '0 0 15px rgba(168, 230, 207, 0.6)'
                  }}
                />
              </div>
              
              {result > 0.5 ? (
                <div className="bg-red-light border border-red p-small rounded text-red bold text-large shadow-pink">
                  ALERTA: ALTO RIESGO
                </div>
              ) : (
                <div className="bg-mint-light border border-mint p-small rounded text-mint bold text-large shadow-mint">
                  APROBADO: BAJO RIESGO
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Slide18 = () => (
  <div className="slide-center">
    <div className="icon-wrapper shadow-pink mb">
      <Briefcase size={80} className="text-pink" />
    </div>
    <h2 className="title-large mb" style={{ fontSize: '4rem' }}>Impacto Final</h2>
    <div className="glass-card large-card description text-center p-large">
      <p style={{ fontSize: '1.75rem' }}>La implementación de este modelo asegura una tasa de detección de estafas del <b className="text-mint" style={{ fontSize: '2.5rem' }}>97%</b>.</p>
      <p className="mt" style={{ fontSize: '1.5rem' }}>Hemos transformado los datos crudos en un sistema, automático y escalable que protege el capital del prestamista en tiempo real.</p>
      <p className="text-pink bold mt" style={{ fontSize: '3rem' }}>¡Gracias!</p>
    </div>
  </div>
);

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, SlideDist1, SlideDist2, SlideDist3, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13, Slide14, Slide15, Slide16, Slide17, Slide18];

const App = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => Math.min(slides.length - 1, p + 1)), []);
  const prev = useCallback(() => setCurrent((p) => Math.max(0, p - 1)), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'Enter') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  const CurrentSlide = slides[current];

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-title">P2P LENDING</div>
        <div className="header-counter">{current + 1} / {slides.length}</div>
      </header>

      {/* SLIDE CONTENT AREA */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="slide-wrapper"
          >
            <CurrentSlide />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* NAVIGATION CONTROLS */}
      <footer className="footer">
        <div className="dots-container">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)}
              className={`dot ${i === current ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="buttons-container">
          <button onClick={prev} disabled={current === 0} className="nav-btn">
            <ChevronLeft size={32} />
          </button>
          <button onClick={next} disabled={current === slides.length - 1} className="nav-btn primary">
            <ChevronRight size={32} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
